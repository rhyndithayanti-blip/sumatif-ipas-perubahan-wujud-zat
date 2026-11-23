import { Question, QuestionBlueprint, CognitiveLevel, Difficulty } from '../types';

/**
 * Data Acuan Matriks Kisi-Kisi Penulisan Soal Tes Sumatif
 * Kurikulum Merdeka - Fase B (Kelas 4) Mata Pelajaran IPAS
 * Lingkup Materi: Wujud Zat dan Perubahannya (Tanpa Siklus Air & Tanpa Pengukuran)
 */

export interface BlueprintDefinition {
  elemen: string;
  tujuanPembelajaran: string;
  indikatorSoal: string;
  levelKognitif: CognitiveLevel;
  bobotSkor: number;
}

// Peta acuan default 35 butir soal IPAS Kelas 4 Kurikulum Merdeka
export const DEFAULT_BLUEPRINT_MAP: Record<number, BlueprintDefinition> = {
  1: {
    elemen: 'Sifat & Karakteristik Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat mengidentifikasi berbagai benda berdasarkan wujud zatnya (padat, cair, dan gas).',
    indikatorSoal: 'Disajikan gambar tiga benda (kubus kayu, air di dalam gelas, dan balon udara), peserta didik dapat mengurutkan wujud zat ketiga benda secara tepat.',
    levelKognitif: 'L1',
    bobotSkor: 1,
  },
  2: {
    elemen: 'Sifat & Karakteristik Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat memahami pengertian materi dalam kajian ilmu pengetahuan alam.',
    indikatorSoal: 'Disajikan definisi sesuatu yang memiliki massa dan menempati ruang, peserta didik dapat menyebutkan istilah yang tepat.',
    levelKognitif: 'L1',
    bobotSkor: 1,
  },
  3: {
    elemen: 'Sifat & Karakteristik Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat mengelompokkan benda-benda di sekitar yang berwujud padat.',
    indikatorSoal: 'Disajikan empat kelompok nama benda sehari-hari, peserta didik dapat memilih kelompok benda yang seluruhnya berwujud padat.',
    levelKognitif: 'L1',
    bobotSkor: 1,
  },
  4: {
    elemen: 'Sifat & Karakteristik Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat mendeskripsikan karakteristik bentuk dan volume benda padat.',
    indikatorSoal: 'Disajikan percobaan pemindahan penghapus karet ke beberapa wadah berbeda, peserta didik dapat menyimpulkan sifat tetap benda padat.',
    levelKognitif: 'L2',
    bobotSkor: 1,
  },
  5: {
    elemen: 'Sifat & Karakteristik Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat menganalisis sifat bentuk dan volume benda cair saat dipindahkan wadahnya.',
    indikatorSoal: 'Disajikan narasi penuangan sirup dari botol ke gelas dan mangkuk lebar, peserta didik dapat menyimpulkan perubahan bentuk dan ketetapan volume zat cair.',
    levelKognitif: 'L2',
    bobotSkor: 1,
  },
  6: {
    elemen: 'Sifat & Karakteristik Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat menyelidiki sifat permukaan benda cair yang tenang.',
    indikatorSoal: 'Disajikan situasi botol berisi air yang dimiringkan di atas meja datar, peserta didik dapat menentukan posisi permukaan air yang tenang di dalam botol.',
    levelKognitif: 'L2',
    bobotSkor: 1,
  },
  7: {
    elemen: 'Sifat & Karakteristik Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat mengidentifikasi karakteristik dan sifat benda gas.',
    indikatorSoal: 'Disajikan contoh udara yang mengisi berbagai bentuk balon, peserta didik dapat menyebutkan sifat benda gas yang mengisi seluruh ruang.',
    levelKognitif: 'L1',
    bobotSkor: 1,
  },
  8: {
    elemen: 'Sifat & Karakteristik Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat membedakan benda padat lunak yang berubah bentuk karena gaya dengan benda cair.',
    indikatorSoal: 'Disajikan contoh plastisin dan tanah liat yang dapat dibentuk dengan tangan, peserta didik dapat menjelaskan alasan benda tersebut tetap digolongkan padat.',
    levelKognitif: 'L2',
    bobotSkor: 1,
  },
  9: {
    elemen: 'Energi Kalor & Perubahannya',
    tujuanPembelajaran: 'Peserta didik dapat mengevaluasi sifat perubahan sementara (reversibel) pada perubahan wujud lilin.',
    indikatorSoal: 'Disajikan narasi batang lilin yang meleleh saat dipanaskan lalu mengeras kembali saat dingin, peserta didik dapat menjelaskan alasan perubahan wujud tersebut bersifat sementara.',
    levelKognitif: 'L3',
    bobotSkor: 1,
  },
  10: {
    elemen: 'Perubahan Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat mengidentifikasi proses perubahan wujud benda padat menjadi cair (mencair).',
    indikatorSoal: 'Disajikan gambar es batu di dalam gelas yang terkena sinar matahari, peserta didik dapat menentukan jenis perubahan wujud yang terjadi.',
    levelKognitif: 'L1',
    bobotSkor: 1,
  },
  11: {
    elemen: 'Energi Kalor & Perubahannya',
    tujuanPembelajaran: 'Peserta didik dapat menjelaskan pengaruh penyerapan kalor terhadap proses mencair.',
    indikatorSoal: 'Disajikan peristiwa mentega yang dipanaskan di atas wajan hingga mencair, peserta didik dapat menentukan peran penyerapan energi panas (kalor).',
    levelKognitif: 'L2',
    bobotSkor: 1,
  },
  12: {
    elemen: 'Perubahan Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat mengidentifikasi proses perubahan wujud benda cair menjadi padat (membeku).',
    indikatorSoal: 'Disajikan ilustrasi pembuatan es lilin dari jus buah cair dalam freezer, peserta didik dapat menyebutkan nama perubahan wujud yang terjadi.',
    levelKognitif: 'L1',
    bobotSkor: 1,
  },
  13: {
    elemen: 'Penerapan Sains Sehari-hari',
    tujuanPembelajaran: 'Peserta didik dapat memberikan contoh peristiwa membeku dalam kehidupan sehari-hari.',
    indikatorSoal: 'Disajikan beberapa pilihan kejadian sehari-hari, peserta didik dapat memilih contoh peristiwa membeku yang tepat.',
    levelKognitif: 'L2',
    bobotSkor: 1,
  },
  14: {
    elemen: 'Energi Kalor & Perubahannya',
    tujuanPembelajaran: 'Peserta didik dapat menganalisis pengaruh pemanasan terus-menerus terhadap berkurangnya air mendidih.',
    indikatorSoal: 'Disajikan gambar panci air mendidih di atas pembakar, peserta didik dapat menjelaskan berkurangnya air karena menyerap kalor dan berubah menjadi uap gas.',
    levelKognitif: 'L2',
    bobotSkor: 1,
  },
  15: {
    elemen: 'Perubahan Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat mengidentifikasi proses perubahan wujud benda cair menjadi gas (menguap).',
    indikatorSoal: 'Disajikan fenomena mengeringnya lantai basah akibat angin dan sinar matahari, peserta didik dapat menentukan proses penguapan.',
    levelKognitif: 'L1',
    bobotSkor: 1,
  },
  16: {
    elemen: 'Energi Kalor & Perubahannya',
    tujuanPembelajaran: 'Peserta didik dapat menganalisis faktor-faktor yang mempercepat laju penguapan zat cair.',
    indikatorSoal: 'Disajikan perbandingan cara menjemur dua handuk basah yang berbeda perlakuannya, peserta didik dapat menganalisis kondisi yang paling cepat menguapkan air.',
    levelKognitif: 'L3',
    bobotSkor: 1,
  },
  17: {
    elemen: 'Perubahan Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat menjelaskan proses terbentuknya embun pada permukaan benda dingin.',
    indikatorSoal: 'Disajikan gambar gelas berisi air es dengan titik air di bagian luar gelas, peserta didik dapat menjelaskan asal titik air dari pengembunan uap air udara.',
    levelKognitif: 'L2',
    bobotSkor: 1,
  },
  18: {
    elemen: 'Penerapan Sains Sehari-hari',
    tujuanPembelajaran: 'Peserta didik dapat membedakan contoh peristiwa mengembun dan bukan mengembun di lingkungan sekitar.',
    indikatorSoal: 'Disajikan empat contoh kejadian sehari-hari, peserta didik dapat mengidentifikasi kejadian yang bukan merupakan peristiwa mengembun.',
    levelKognitif: 'L1',
    bobotSkor: 1,
  },
  19: {
    elemen: 'Perubahan Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat mengidentifikasi proses perubahan wujud benda padat langsung menjadi gas (menyublim).',
    indikatorSoal: 'Disajikan peristiwa habisnya pengharum ruangan padat/kamper yang mengeluarkan bau harum, peserta didik dapat menentukan istilah menyublim.',
    levelKognitif: 'L1',
    bobotSkor: 1,
  },
  20: {
    elemen: 'Perubahan Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat mengidentifikasi proses perubahan wujud benda gas menjadi padat (mengkristal).',
    indikatorSoal: 'Disajikan fenomena terbentuknya bunga es di dinding freezer dari uap air, peserta didik dapat menentukan istilah mengkristal/menghablur.',
    levelKognitif: 'L2',
    bobotSkor: 1,
  },
  21: {
    elemen: 'Energi Kalor & Perubahannya',
    tujuanPembelajaran: 'Peserta didik dapat mengelompokkan jenis perubahan wujud yang memerlukan/menyerap kalor.',
    indikatorSoal: 'Peserta didik dapat memilih kelompok tiga perubahan wujud zat yang sama-sama terjadi karena penyerapan kalor.',
    levelKognitif: 'L2',
    bobotSkor: 1,
  },
  22: {
    elemen: 'Energi Kalor & Perubahannya',
    tujuanPembelajaran: 'Peserta didik dapat mengelompokkan jenis perubahan wujud yang melepaskan kalor.',
    indikatorSoal: 'Peserta didik dapat memilih kelompok perubahan wujud zat yang terjadi akibat pelepasan energi panas (pendinginan).',
    levelKognitif: 'L2',
    bobotSkor: 1,
  },
  23: {
    elemen: 'Penerapan Sains Sehari-hari',
    tujuanPembelajaran: 'Peserta didik dapat mengaitkan konsep perubahan wujud menguap dengan proses pembuatan garam tradisional.',
    indikatorSoal: 'Disajikan deskripsi kegiatan petani garam menampung air laut di bawah terik matahari, peserta didik dapat mengidentifikasi proses penguapan air laut.',
    levelKognitif: 'L2',
    bobotSkor: 1,
  },
  24: {
    elemen: 'Penerapan Sains Sehari-hari',
    tujuanPembelajaran: 'Peserta didik dapat mengidentifikasi urutan perubahan wujud pada pengolahan makanan sederhana.',
    indikatorSoal: 'Disajikan proses pembuatan permen cokelat dari cokelat batang yang dipanaskan lalu dicetak di kulkas, peserta didik dapat mengurutkan perubahan wujud mencair lalu membeku.',
    levelKognitif: 'L2',
    bobotSkor: 1,
  },
  25: {
    elemen: 'Penerapan Sains Sehari-hari',
    tujuanPembelajaran: 'Peserta didik dapat memecahkan masalah sehari-hari terkait pencegahan perpindahan kalor agar es tidak cepat mencair.',
    indikatorSoal: 'Disajikan masalah membawa es krim dalam perjalanan jauh tanpa kulkas, peserta didik dapat memilih wadah isolator terbaik untuk memperlambat pelelehan.',
    levelKognitif: 'L3',
    bobotSkor: 1,
  },
  26: {
    elemen: 'Sifat & Karakteristik Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat membandingkan sifat bentuk dan volume benda padat dengan benda cair.',
    indikatorSoal: 'Disajikan 2 pernyataan mengenai ketetapan bentuk dan volume benda padat serta cair, peserta didik dapat menentukan nilai kebenaran (Benar/Salah) masing-masing pernyataan.',
    levelKognitif: 'L2',
    bobotSkor: 2,
  },
  27: {
    elemen: 'Perubahan Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat menganalisis terjadinya pengembunan pada permukaan luar wadah bersuhu dingin.',
    indikatorSoal: 'Disajikan gambar gelas berisi air es berembun beserta 2 pernyataan penjelasan, peserta didik dapat mengevaluasi kebenaran (Benar/Salah) setiap pernyataan.',
    levelKognitif: 'L2',
    bobotSkor: 2,
  },
  28: {
    elemen: 'Energi Kalor & Perubahannya',
    tujuanPembelajaran: 'Peserta didik dapat mengevaluasi peran penyerapan dan pelepasan kalor dalam perubahan wujud zat.',
    indikatorSoal: 'Disajikan 2 pernyataan terkait keterlibatan kalor pada peristiwa mencair, menguap, dan membeku, peserta didik dapat menentukan kebenaran (Benar/Salah) setiap pernyataan.',
    levelKognitif: 'L3',
    bobotSkor: 2,
  },
  29: {
    elemen: 'Sifat & Karakteristik Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat mengidentifikasi contoh serta sifat-sifat benda berwujud gas.',
    indikatorSoal: 'Disajikan 2 pernyataan tentang contoh dan sifat benda gas menekan ke segala arah, peserta didik dapat menentukan kebenaran (Benar/Salah) setiap pernyataan.',
    levelKognitif: 'L2',
    bobotSkor: 2,
  },
  30: {
    elemen: 'Penerapan Sains Sehari-hari',
    tujuanPembelajaran: 'Peserta didik dapat menganalisis penerapan perubahan wujud zat pada aktivitas ekonomi dan rumah tangga.',
    indikatorSoal: 'Disajikan 2 pernyataan mengenai pengeringan hasil panen dan kapur barus di lemari, peserta didik dapat menilai kebenaran (Benar/Salah) masing-masing pernyataan.',
    levelKognitif: 'L3',
    bobotSkor: 2,
  },
  31: {
    elemen: 'Perubahan Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat menyebutkan istilah perubahan wujud dari benda cair menjadi padat.',
    indikatorSoal: 'Disajikan definisi perubahan wujud zat cair menjadi padat akibat pendinginan, peserta didik dapat menuliskan nama peristiwanya dengan tepat.',
    levelKognitif: 'L1',
    bobotSkor: 2,
  },
  32: {
    elemen: 'Perubahan Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat mengidentifikasi nama peristiwa perubahan wujud gas menjadi titik air di alam.',
    indikatorSoal: 'Disajikan fenomena munculnya titik-titik air pada daun dan kaca di pagi hari dingin, peserta didik dapat menuliskan nama perubahan wujud yang terjadi.',
    levelKognitif: 'L2',
    bobotSkor: 2,
  },
  33: {
    elemen: 'Perubahan Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat mengidentifikasi peristiwa menyublim melalui pengamatan gambar kapur barus.',
    indikatorSoal: 'Disajikan gambar kapur barus di dalam lemari pakaian, peserta didik dapat menuliskan nama perubahan wujud padat langsung menjadi gas dengan benar.',
    levelKognitif: 'L2',
    bobotSkor: 2,
  },
  34: {
    elemen: 'Energi Kalor & Perubahannya',
    tujuanPembelajaran: 'Peserta didik dapat melengkapi konsep kebutuhan energi kalor pada peristiwa mencair.',
    indikatorSoal: 'Disajikan kalimat rumpang mengenai syarat perubahan wujud es/mentega menjadi cair, peserta didik dapat mengisi kata kerja yang tepat terkait kalor.',
    levelKognitif: 'L2',
    bobotSkor: 2,
  },
  35: {
    elemen: 'Sifat & Karakteristik Wujud Zat',
    tujuanPembelajaran: 'Peserta didik dapat menyimpulkan nama wujud zat berdasarkan ciri bentuk dan volume yang selalu mengikuti ruang.',
    indikatorSoal: 'Disajikan deskripsi ciri-ciri zat tidak kasat mata yang mengisi seluruh ruang wadahnya, peserta didik dapat menuliskan nama wujud zat tersebut.',
    levelKognitif: 'L1',
    bobotSkor: 2,
  },
};

/**
 * Format label bentuk soal
 */
export function getBentukSoalLabel(type: string): string {
  switch (type) {
    case 'pg':
      return 'Pilihan Ganda (PG)';
    case 'pgk':
      return 'Pilihan Ganda Kompleks (PGK)';
    case 'pgk_kategori':
      return 'PGK Kategori (Benar / Salah)';
    case 'isian':
      return 'Isian Singkat';
    default:
      return 'Pilihan Ganda';
  }
}

/**
 * Format label level kognitif
 */
export function getCognitiveLevelLabel(level: CognitiveLevel): string {
  switch (level) {
    case 'L1':
      return 'L1 (Pemahaman / Mengingat)';
    case 'L2':
      return 'L2 (Aplikasi / Penerapan)';
    case 'L3':
      return 'L3 (Penalaran / Analisis HOTS)';
    default:
      return 'L2 (Aplikasi)';
  }
}

/**
 * Mendapatkan format string ringkas kunci jawaban
 */
export function formatCorrectAnswer(q: Question): string {
  if (q.type === 'pg') {
    return typeof q.correctAnswer === 'string' ? q.correctAnswer : 'A';
  }
  if (q.type === 'pgk') {
    if (Array.isArray(q.correctAnswer)) {
      return q.correctAnswer.join(', ');
    }
    return String(q.correctAnswer || 'A');
  }
  if (q.type === 'pgk_kategori') {
    if (q.statements && q.statements.length > 0) {
      return q.statements
        .map((st, i) => `${i + 1}:${st.correctAnswer ? 'B' : 'S'}`)
        .join(', ');
    }
    return 'B/S';
  }
  if (q.type === 'isian') {
    return typeof q.correctAnswer === 'string' ? q.correctAnswer : '-';
  }
  return '-';
}

/**
 * Menghasilkan metadata blueprint lengkap untuk butir soal tertentu
 */
export function getQuestionBlueprint(q: Question, index: number): QuestionBlueprint {
  const def = DEFAULT_BLUEPRINT_MAP[q.id];

  const elemen =
    q.elemen ||
    (def ? def.elemen : inferElemenFromTopic(q.topic));

  const levelKognitif: CognitiveLevel =
    q.levelKognitif ||
    (def ? def.levelKognitif : inferLevelFromDifficulty(q.difficulty));

  const tujuanPembelajaran =
    q.tujuanPembelajaran ||
    (def
      ? def.tujuanPembelajaran
      : `Peserta didik mampu memahami dan menerapkan konsep ${q.topic} pada materi Wujud Zat dan Perubahannya.`);

  const indikatorSoal =
    q.indikatorSoal ||
    (def
      ? def.indikatorSoal
      : `Disajikan stimulus mengenai ${q.topic}, peserta didik dapat menentukan jawaban yang tepat.`);

  const bobotSkor = q.bobot || (def ? def.bobotSkor : q.type === 'pg' ? 1 : 2);

  return {
    questionId: q.id,
    noSoal: index + 1,
    elemen,
    tujuanPembelajaran,
    materiPokok: q.topic,
    indikatorSoal,
    levelKognitif,
    levelKognitifLabel: getCognitiveLevelLabel(levelKognitif),
    bentukSoal: getBentukSoalLabel(q.type),
    kunciJawaban: formatCorrectAnswer(q),
    bobotSkor,
    difficulty: q.difficulty,
  };
}

function inferElemenFromTopic(topic: string): string {
  const t = topic.toLowerCase();
  if (t.includes('kalor') || t.includes('penguapan') || t.includes('lilin')) {
    return 'Energi Kalor & Perubahannya';
  }
  if (t.includes('garam') || t.includes('cokelat') || t.includes('es krim') || t.includes('sehari-hari') || t.includes('contoh')) {
    return 'Penerapan Sains Sehari-hari';
  }
  if (t.includes('mencair') || t.includes('membeku') || t.includes('menguap') || t.includes('mengembun') || t.includes('menyublim') || t.includes('mengkristal') || t.includes('perubahan')) {
    return 'Perubahan Wujud Zat';
  }
  return 'Sifat & Karakteristik Wujud Zat';
}

function inferLevelFromDifficulty(diff: Difficulty): CognitiveLevel {
  if (diff === 'Mudah') return 'L1';
  if (diff === 'Sukar') return 'L3';
  return 'L2';
}

/**
 * Menghitung rekapitulasi distribusi kisi-kisi soal
 */
export function getBlueprintStatistics(questions: Question[]) {
  const total = questions.length;
  const blueprints = questions.map((q, idx) => getQuestionBlueprint(q, idx));

  const elemenCountMap: Record<string, number> = {};
  const levelCountMap: Record<CognitiveLevel, number> = { L1: 0, L2: 0, L3: 0 };
  const diffCountMap: Record<Difficulty, number> = { Mudah: 0, Sedang: 0, Sukar: 0 };
  const typeCountMap: Record<string, number> = { pg: 0, pgk: 0, pgk_kategori: 0, isian: 0 };

  let totalBobot = 0;

  blueprints.forEach((bp, idx) => {
    elemenCountMap[bp.elemen] = (elemenCountMap[bp.elemen] || 0) + 1;
    levelCountMap[bp.levelKognitif] = (levelCountMap[bp.levelKognitif] || 0) + 1;
    totalBobot += bp.bobotSkor;
    const q = questions[idx];
    if (q) {
      diffCountMap[q.difficulty] = (diffCountMap[q.difficulty] || 0) + 1;
      typeCountMap[q.type] = (typeCountMap[q.type] || 0) + 1;
    }
  });

  const elemenDistribution = Object.entries(elemenCountMap).map(([elemen, count]) => ({
    elemen,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
  }));

  const levelDistribution = [
    {
      level: 'L1' as const,
      label: 'L1 (Pemahaman / C1-C2)',
      desc: 'Mengingat & Memahami konsep dasar',
      count: levelCountMap.L1,
      percentage: total > 0 ? Math.round((levelCountMap.L1 / total) * 100) : 0,
      color: 'blue',
    },
    {
      level: 'L2' as const,
      label: 'L2 (Aplikasi / C3)',
      desc: 'Menerapkan konsep pada konteks nyata',
      count: levelCountMap.L2,
      percentage: total > 0 ? Math.round((levelCountMap.L2 / total) * 100) : 0,
      color: 'emerald',
    },
    {
      level: 'L3' as const,
      label: 'L3 (Penalaran / C4-C6 HOTS)',
      desc: 'Menganalisis & memecahkan masalah kompleks',
      count: levelCountMap.L3,
      percentage: total > 0 ? Math.round((levelCountMap.L3 / total) * 100) : 0,
      color: 'amber',
    },
  ];

  const difficultyDistribution = [
    {
      difficulty: 'Mudah' as const,
      count: diffCountMap.Mudah,
      percentage: total > 0 ? Math.round((diffCountMap.Mudah / total) * 100) : 0,
      color: 'emerald',
    },
    {
      difficulty: 'Sedang' as const,
      count: diffCountMap.Sedang,
      percentage: total > 0 ? Math.round((diffCountMap.Sedang / total) * 100) : 0,
      color: 'blue',
    },
    {
      difficulty: 'Sukar' as const,
      count: diffCountMap.Sukar,
      percentage: total > 0 ? Math.round((diffCountMap.Sukar / total) * 100) : 0,
      color: 'rose',
    },
  ];

  const allTypeItems = [
    {
      type: 'pg',
      label: 'Pilihan Ganda (PG)',
      count: typeCountMap.pg,
      percentage: total > 0 ? Math.round((typeCountMap.pg / total) * 100) : 0,
    },
    {
      type: 'pgk',
      label: 'Pilihan Ganda Kompleks (PGK)',
      count: typeCountMap.pgk,
      percentage: total > 0 ? Math.round((typeCountMap.pgk / total) * 100) : 0,
    },
    {
      type: 'pgk_kategori',
      label: 'PGK Kategori (Benar / Salah)',
      count: typeCountMap.pgk_kategori,
      percentage: total > 0 ? Math.round((typeCountMap.pgk_kategori / total) * 100) : 0,
    },
    {
      type: 'isian',
      label: 'Isian Singkat',
      count: typeCountMap.isian,
      percentage: total > 0 ? Math.round((typeCountMap.isian / total) * 100) : 0,
    },
  ];

  const typeDistribution = allTypeItems.filter((item) => item.count > 0);

  return {
    total,
    totalBobot,
    blueprints,
    elemenDistribution,
    levelDistribution,
    difficultyDistribution,
    typeDistribution,
  };
}
