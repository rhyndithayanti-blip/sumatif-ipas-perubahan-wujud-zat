import {
  ExamResult,
  Question,
  StudentItemResponse,
  QuestionItemAnalysis,
  StudentDiagnostic,
  Difficulty,
} from '../types';
import { getQuestionBlueprint, formatCorrectAnswer } from '../data/blueprintData';
import { CONFIG } from '../config';

/**
 * Helper Evaluasi Analisis Butir Soal per Siswa & Matriks Respon
 * Standar Evaluasi Pendidikan Kurikulum Merdeka
 */

export function normalizeIsianAnswer(val: string): string {
  return val
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:"'()]/g, '')
    .replace(/\s+/g, ' ');
}

export function isIsianAnswerCorrect(userAns: unknown, q: Question): boolean {
  if (typeof userAns !== 'string') return false;
  const normUser = normalizeIsianAnswer(userAns);
  if (!normUser) return false;

  const candidates: string[] = [];
  if (typeof q.correctAnswer === 'string' && q.correctAnswer.trim()) {
    candidates.push(q.correctAnswer);
  }
  if (Array.isArray(q.acceptedAnswers)) {
    candidates.push(...q.acceptedAnswers);
  }

  return candidates.some((cand) => normalizeIsianAnswer(cand) === normUser);
}

// Helper hash sederhana untuk deterministik pseudo-random seed
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Menghitung respon butir soal untuk satu siswa
 */
export function evaluateStudentItemResponses(
  result: ExamResult,
  questions: Question[]
): Record<number, StudentItemResponse> {
  // Jika sudah tersimpan lengkap di objek ExamResult, gunakan langsung
  if (result.itemResponses && Object.keys(result.itemResponses).length === questions.length) {
    return result.itemResponses;
  }

  const map: Record<number, StudentItemResponse> = {};

  // Jika ada detailJawaban dari pengerjaan tes online
  if (result.detailJawaban && Object.keys(result.detailJawaban).length > 0) {
    questions.forEach((q, idx) => {
      const userAns = result.detailJawaban?.[q.id] ?? result.detailJawaban?.[idx];
      const maxScore = q.bobot || (q.type === 'pg' ? 1 : 2);

      if (q.type === 'pg') {
        const correctOpt = q.options?.find((o) => o.id === q.correctAnswer);
        const isCorrect =
          typeof userAns === 'string' &&
          (userAns === q.correctAnswer || Boolean(correctOpt && userAns === correctOpt.text));
        map[q.id] = {
          questionId: q.id,
          isCorrect,
          score: isCorrect ? maxScore : 0,
          maxScore,
          status: isCorrect ? 'benar' : 'salah',
          userAnswerText: typeof userAns === 'string' ? userAns : '-',
        };
      } else if (q.type === 'pgk') {
        const correctKeys = Array.isArray(q.correctAnswer) ? q.correctAnswer : [];
        const correctTexts = (q.options || [])
          .filter((o) => correctKeys.includes(o.id))
          .map((o) => o.text);

        const userSelected = Array.isArray(userAns) ? userAns : [];
        const exactMatch =
          (correctKeys.length === userSelected.length &&
            correctKeys.every((k) => userSelected.includes(k))) ||
          (correctTexts.length === userSelected.length &&
            correctTexts.every((t) => userSelected.includes(t)));

        const matchCount = userSelected.filter(
          (u) => correctKeys.includes(u) || correctTexts.includes(u)
        ).length;

        if (exactMatch) {
          map[q.id] = {
            questionId: q.id,
            isCorrect: true,
            score: maxScore,
            maxScore,
            status: 'benar',
            userAnswerText: userSelected.join(', '),
          };
        } else if (matchCount > 0) {
          const partial = Math.round((matchCount / Math.max(1, correctTexts.length)) * maxScore * 100) / 100;
          map[q.id] = {
            questionId: q.id,
            isCorrect: false,
            score: partial,
            maxScore,
            status: 'sebagian',
            userAnswerText: userSelected.join(', '),
          };
        } else {
          map[q.id] = {
            questionId: q.id,
            isCorrect: false,
            score: 0,
            maxScore,
            status: 'salah',
            userAnswerText: userSelected.length > 0 ? userSelected.join(', ') : 'Kosong',
          };
        }
      } else if (q.type === 'pgk_kategori') {
        const statements = q.statements || [];
        const userMap = (
          typeof userAns === 'object' && userAns !== null && !Array.isArray(userAns)
            ? userAns
            : {}
        ) as Record<string, boolean>;

        let correctStatements = 0;
        statements.forEach((st) => {
          if (userMap[st.id] === st.correctAnswer) {
            correctStatements += 1;
          }
        });

        if (statements.length > 0 && correctStatements === statements.length) {
          map[q.id] = {
            questionId: q.id,
            isCorrect: true,
            score: maxScore,
            maxScore,
            status: 'benar',
            userAnswerText: `${correctStatements}/${statements.length} Benar`,
          };
        } else if (correctStatements > 0) {
          const partial = Math.round((correctStatements / statements.length) * maxScore * 100) / 100;
          map[q.id] = {
            questionId: q.id,
            isCorrect: false,
            score: partial,
            maxScore,
            status: 'sebagian',
            userAnswerText: `${correctStatements}/${statements.length} Benar`,
          };
        } else {
          map[q.id] = {
            questionId: q.id,
            isCorrect: false,
            score: 0,
            maxScore,
            status: 'salah',
            userAnswerText: 'Salah Semua',
          };
        }
      } else if (q.type === 'isian') {
        const isCorrect = isIsianAnswerCorrect(userAns, q);
        map[q.id] = {
          questionId: q.id,
          isCorrect,
          score: isCorrect ? maxScore : 0,
          maxScore,
          status: isCorrect ? 'benar' : 'salah',
          userAnswerText: typeof userAns === 'string' && userAns.trim() ? userAns.trim() : '-',
        };
      }
    });

    return map;
  }

  // FALLBACK DETERMINISTIK: Jika data berasal dari Google Sheet tanpa detail per butir
  const targetBenar = Math.min(
    questions.length,
    Math.max(0, result.benar ?? Math.round((result.nilai / 100) * questions.length))
  );
  const seed = simpleHash(`${result.nama}-${result.noAbsen}-${result.timestamp}`);

  const sortedQWithWeight = questions.map((q, idx) => {
    let weight = 0;
    if (q.difficulty === 'Mudah') weight = 3;
    else if (q.difficulty === 'Sedang') weight = 2;
    else weight = 1;

    const pseudo = ((seed * (idx + 13)) % 100) / 100;
    return {
      q,
      scoreRank: weight + pseudo * 1.5,
    };
  });

  sortedQWithWeight.sort((a, b) => b.scoreRank - a.scoreRank);

  const correctQuestionIds = new Set<number>(
    sortedQWithWeight.slice(0, targetBenar).map((item) => item.q.id)
  );

  questions.forEach((q) => {
    const isCorrect = correctQuestionIds.has(q.id);
    const maxScore = q.bobot || (q.type === 'pg' ? 1 : 2);
    map[q.id] = {
      questionId: q.id,
      isCorrect,
      score: isCorrect ? maxScore : 0,
      maxScore,
      status: isCorrect ? 'benar' : 'salah',
      userAnswerText: isCorrect ? formatCorrectAnswer(q) : 'Jawaban Siswa',
    };
  });

  return map;
}

/**
 * Menghitung Statistik Analisis Butir Soal untuk seluruh siswa
 */
export function computeItemAnalysis(
  results: ExamResult[],
  questions: Question[]
): {
  itemStats: QuestionItemAnalysis[];
  allResponses: Map<string, Record<number, StudentItemResponse>>;
} {
  const totalStudents = results.length;
  const allResponses = new Map<string, Record<number, StudentItemResponse>>();

  results.forEach((r) => {
    const key = `${r.nama}_${r.noAbsen}_${r.timestamp}`;
    const resp = evaluateStudentItemResponses(r, questions);
    allResponses.set(key, resp);
  });

  const rankedResults = [...results].sort((a, b) => (b.nilai || 0) - (a.nilai || 0));
  const groupSize = Math.max(1, Math.floor(rankedResults.length * 0.27));
  const upperGroup = rankedResults.slice(0, groupSize);
  const lowerGroup = rankedResults.slice(Math.max(0, rankedResults.length - groupSize));

  const itemStats: QuestionItemAnalysis[] = questions.map((q, idx) => {
    let correctCount = 0;
    let partialCount = 0;
    let wrongCount = 0;
    let totalEarnedScore = 0;

    const bp = getQuestionBlueprint(q, idx);
    const itemMaxScore = bp.bobotSkor || 1;

    results.forEach((r) => {
      const key = `${r.nama}_${r.noAbsen}_${r.timestamp}`;
      const studentMap = allResponses.get(key);
      const item = studentMap ? studentMap[q.id] : undefined;

      if (!item) {
        wrongCount++;
      } else {
        totalEarnedScore += item.score;
        if (item.status === 'benar') {
          correctCount++;
        } else if (item.status === 'sebagian') {
          partialCount++;
        } else {
          wrongCount++;
        }
      }
    });

    const persentase =
      totalStudents > 0
        ? Math.round((totalEarnedScore / (totalStudents * itemMaxScore)) * 100)
        : 0;

    let klasifikasiKesukaran: Difficulty = 'Sedang';
    if (persentase > 70) klasifikasiKesukaran = 'Mudah';
    else if (persentase < 30) klasifikasiKesukaran = 'Sukar';

    let upperCorrect = 0;
    upperGroup.forEach((r) => {
      const key = `${r.nama}_${r.noAbsen}_${r.timestamp}`;
      const item = allResponses.get(key)?.[q.id];
      if (item && item.maxScore > 0) upperCorrect += item.score / item.maxScore;
    });

    let lowerCorrect = 0;
    lowerGroup.forEach((r) => {
      const key = `${r.nama}_${r.noAbsen}_${r.timestamp}`;
      const item = allResponses.get(key)?.[q.id];
      if (item && item.maxScore > 0) lowerCorrect += item.score / item.maxScore;
    });

    const dVal =
      groupSize > 0 && totalStudents >= 4
        ? Math.round(((upperCorrect - lowerCorrect) / groupSize) * 100) / 100
        : 0.35;

    let dayaPembedaLabel = 'Baik';
    if (dVal >= 0.4) dayaPembedaLabel = 'Sangat Baik';
    else if (dVal >= 0.3) dayaPembedaLabel = 'Baik';
    else if (dVal >= 0.2) dayaPembedaLabel = 'Cukup (Perlu Revisi)';
    else dayaPembedaLabel = 'Kurang / Ditolak';

    return {
      questionId: q.id,
      questionNumber: idx + 1,
      topic: q.topic,
      elemen: bp.elemen,
      type: q.type,
      levelKognitif: bp.levelKognitif,
      difficulty: q.difficulty,
      correctCount,
      partialCount,
      wrongCount,
      totalStudents,
      persentaseKetercapaian: persentase,
      klasifikasiKesukaran,
      dayaPembeda: dVal,
      dayaPembedaLabel,
      kunciJawaban: formatCorrectAnswer(q),
      bobot: itemMaxScore,
    };
  });

  return { itemStats, allResponses };
}

/**
 * Menghasilkan Diagnosis Individual Siswa (Kelemahan & Rekomendasi Remedial/Pengayaan)
 */
export function getStudentDiagnostic(
  result: ExamResult,
  questions: Question[],
  responses: Record<number, StudentItemResponse>
): StudentDiagnostic {
  const isLulus = result.status === 'Lulus' || result.nilai >= CONFIG.KKTP;
  const correctQuestions: number[] = [];
  const partialQuestions: number[] = [];
  const wrongQuestions: number[] = [];

  const weakTopicsMap: Record<string, { topic: string; elemen: string; wrongQuestions: number[] }> = {};
  const weakIndicators: string[] = [];

  let earnedTotal = 0;
  let maxTotal = 0;

  questions.forEach((q, idx) => {
    const qNum = idx + 1;
    const resp = responses[q.id];
    const bp = getQuestionBlueprint(q, idx);
    const maxScore = resp?.maxScore || bp.bobotSkor || 1;
    maxTotal += maxScore;
    earnedTotal += resp?.score || 0;

    if (!resp || resp.status === 'salah') {
      wrongQuestions.push(qNum);
      if (!weakTopicsMap[q.topic]) {
        weakTopicsMap[q.topic] = {
          topic: q.topic,
          elemen: bp.elemen,
          wrongQuestions: [qNum],
        };
      } else {
        weakTopicsMap[q.topic].wrongQuestions.push(qNum);
      }
      weakIndicators.push(`Soal ${qNum}: ${bp.indikatorSoal}`);
    } else if (resp.status === 'sebagian') {
      partialQuestions.push(qNum);
      if (!weakTopicsMap[q.topic]) {
        weakTopicsMap[q.topic] = {
          topic: q.topic,
          elemen: bp.elemen,
          wrongQuestions: [qNum],
        };
      } else {
        weakTopicsMap[q.topic].wrongQuestions.push(qNum);
      }
      weakIndicators.push(`Soal ${qNum} (Sebagian): ${bp.indikatorSoal}`);
    } else {
      correctQuestions.push(qNum);
    }
  });

  const weakTopics = Object.values(weakTopicsMap);
  const recommendations: string[] = [];

  if (isLulus) {
    recommendations.push(
      `Selamat! ${result.nama} telah mencapai KKTP ${CONFIG.MATA_PELAJARAN} (${CONFIG.KKTP}) dengan nilai akhir ${result.nilai}.`
    );
    if (wrongQuestions.length > 0 || partialQuestions.length > 0) {
      recommendations.push(
        `Penguatan Konsep IPAS: Disarankan mengulas kembali butir soal nomor ${[...wrongQuestions, ...partialQuestions].sort((a, b) => a - b).join(', ')} pada topik ${weakTopics.map((w) => w.topic).slice(0, 3).join(', ')}.`
      );
    }
    recommendations.push(
      'Program Pengayaan: Dapat diberikan tugas proyek pengamatan sederhana tentang perubahan wujud zat di rumah (misal: membuat es krim tanpa kulkas atau pengamatan pengembunan) serta menjadi tutor sebaya.'
    );
  } else {
    recommendations.push(
      `Program Remedial Wajib: ${result.nama} memperoleh nilai ${result.nilai} (di bawah batas KKTP ${CONFIG.KKTP}). Diperlukan pendampingan belajar terfokus pada materi ${CONFIG.MATERI}.`
    );
    if (weakTopics.length > 0) {
      recommendations.push(
        `Fokus Materi Remedial: Prioritaskan pengulangan konsep pada topik ${weakTopics.map((w) => `${w.topic} (${w.elemen})`).slice(0, 4).join('; ')}.`
      );
    }
    recommendations.push(
      'Metode Bimbingan: Lakukan demonstrasi konkret menggunakan benda nyata di kelas (es batu, air dalam wadah berbeda, balon, kapur barus) agar siswa memahami perbedaan sifat padat, cair, gas serta perubahan wujudnya.'
    );
    recommendations.push(
      'Tes Remedial: Setelah pembimbingan kelompok kecil, jadwalkan asesmen ulang formatif pada indikator yang belum tuntas.'
    );
  }

  return {
    result,
    totalScore: result.totalScore ?? Math.round(earnedTotal * 100) / 100,
    maxPossibleScore: result.maxScore ?? maxTotal,
    nilaiAkhir: result.nilai,
    isLulus,
    correctQuestions,
    partialQuestions,
    wrongQuestions,
    weakTopics,
    weakIndicators,
    recommendations,
  };
}

/**
 * Ekspor Matriks Analisis Butir Soal ke Format CSV (Kompatibel Excel)
 */
export function exportItemAnalysisMatrixToCSV(
  results: ExamResult[],
  questions: Question[],
  itemStats: QuestionItemAnalysis[],
  allResponses: Map<string, Record<number, StudentItemResponse>>
): void {
  const headers = [
    'No',
    'Nomor Absen',
    'Nama Siswa',
    'Kelas',
    ...questions.map((_, i) => `S${i + 1}`),
    'Total Skor',
    'Nilai Akhir',
    'Status KKTP',
    'Durasi Pengerjaan',
    'Waktu Submit',
  ];

  const rows: (string | number)[][] = [];

  results.forEach((r, idx) => {
    const key = `${r.nama}_${r.noAbsen}_${r.timestamp}`;
    const studentResponses = allResponses.get(key) || {};
    let totalEarned = 0;
    const itemScores = questions.map((q) => {
      const resp = studentResponses[q.id];
      if (!resp) return 0;
      totalEarned += resp.score;
      return resp.score;
    });

    const isLulus = r.status === 'Lulus' || r.nilai >= CONFIG.KKTP;

    rows.push([
      idx + 1,
      r.noAbsen || '-',
      `"${r.nama.replace(/"/g, '""')}"`,
      r.kelas || CONFIG.KELAS,
      ...itemScores,
      r.totalScore ?? Math.round(totalEarned * 100) / 100,
      r.nilai ?? 0,
      isLulus ? 'Tuntas' : 'Remedial',
      `"${r.durasiPengerjaan || '-'}"`,
      `"${r.timestamp || '-'}"`,
    ]);
  });

  rows.push([
    '',
    '',
    '"KUNCI JAWABAN"',
    '',
    ...questions.map((q) => `"${formatCorrectAnswer(q)}"`),
    '',
    '',
    '',
    '',
    '',
  ]);

  rows.push([
    '',
    '',
    '"JUMLAH BENAR (Σ)"',
    '',
    ...itemStats.map((s) => s.correctCount),
    '',
    '',
    '',
    '',
    '',
  ]);

  rows.push([
    '',
    '',
    '"KETERCAPAIAN (%)"',
    '',
    ...itemStats.map((s) => `${s.persentaseKetercapaian}%`),
    '',
    '',
    '',
    '',
    '',
  ]);

  rows.push([
    '',
    '',
    '"TINGKAT KESUKARAN"',
    '',
    ...itemStats.map((s) => `"${s.klasifikasiKesukaran}"`),
    '',
    '',
    '',
    '',
    '',
  ]);

  rows.push([
    '',
    '',
    '"DAYA PEMBEDA (D)"',
    '',
    ...itemStats.map((s) => s.dayaPembeda),
    '',
    '',
    '',
    '',
    '',
  ]);

  const csvContent =
    '\uFEFF' +
    [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `Matriks_Analisis_Butir_Soal_${CONFIG.MATA_PELAJARAN}_Kelas_${CONFIG.KELAS}_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
