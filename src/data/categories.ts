export interface QuizQuestion {
  code: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  group: string;
  description: string;
  color: string;
  codeSnippet: string;
  quiz: QuizQuestion;
}

export const categories: Category[] = [
{
  id: "html",
  title: "HTML",
  icon: "/Icon/html.png",
  group: "frontend",
  description: "HTML (HyperText Markup Language) adalah bahasa markup yang digunakan untuk menyusun struktur dasar sebuah halaman web. HTML tidak berfungsi untuk membuat tampilan menjadi indah atau interaktif, tetapi bertugas membangun kerangka utama seperti heading, paragraf, gambar, tabel, form, dan navigasi.\n\nHTML bekerja menggunakan elemen dan tag, seperti <h1>, <p>, <img>, dan <a>. Setiap elemen dapat memiliki atribut yang memberikan informasi tambahan, seperti src pada gambar atau href pada link. Struktur HTML yang baik sangat penting untuk SEO dan aksesibilitas karena mesin pencari dan screen reader membaca struktur tersebut untuk memahami isi halaman.\n\nDalam pengembangan modern, HTML biasanya dikombinasikan dengan CSS untuk styling dan JavaScript untuk interaktivitas. Namun, tanpa HTML, sebuah website tidak memiliki fondasi. Oleh karena itu, memahami semantic HTML seperti <header>, <section>, <article>, dan <footer> sangat penting untuk membangun website yang terstruktur dan profesional.",
  color: "from-zinc-500/20 to-gray-800/20",
  codeSnippet: `<h1>Halo Dunia</h1>
<p>Belajar HTML itu menyenangkan!</p>`,
  quiz: {
    code: `<img src="foto.jpg" alt="Foto Profil">`,
    question: "Apa fungsi atribut alt pada tag <img>?",
    options: [
      "Mengatur ukuran gambar",
      "Memberi teks alternatif jika gambar gagal dimuat",
      "Mengubah warna gambar",
      "Menambahkan animasi"
    ],
    correctIndex: 1,
    explanation: "Atribut alt digunakan untuk memberikan teks alternatif jika gambar tidak dapat ditampilkan dan juga membantu aksesibilitas."
  }
},

{
  id: "css",
  title: "CSS",
  icon: "/Icon/css.png",
  group: "frontend",
  description: "CSS (Cascading Style Sheets) adalah bahasa yang digunakan untuk mengatur tampilan dan desain halaman web. Jika HTML adalah kerangka bangunan, maka CSS adalah cat, dekorasi, dan tata ruangnya. Dengan CSS, kita dapat mengatur warna, ukuran teks, jarak antar elemen, layout, animasi, hingga membuat desain responsif untuk berbagai ukuran layar.\n\nCSS bekerja menggunakan selector dan property. Selector menentukan elemen mana yang akan diberi gaya, sedangkan property menentukan gaya apa yang diterapkan. Konsep penting dalam CSS meliputi box model (margin, border, padding, content), positioning, flexbox, dan grid untuk membuat layout modern.\n\nDalam pengembangan modern, CSS juga mendukung fitur seperti media queries untuk responsive design dan variabel CSS untuk pengelolaan tema. Framework seperti Tailwind CSS dan Bootstrap dibangun di atas konsep dasar CSS. Menguasai CSS berarti mampu mengubah struktur HTML sederhana menjadi tampilan profesional dan menarik.",
  color: "from-zinc-500/20 to-gray-800/20",
  codeSnippet: `.box {
  background-color: blue;
  color: white;
  padding: 10px;
}`,
  quiz: {
    code: `.container {
  display: flex;
  justify-content: center;
}`,
    question: "Apa fungsi justify-content: center pada flexbox?",
    options: [
      "Menyembunyikan elemen",
      "Memusatkan konten secara horizontal",
      "Memusatkan konten secara vertikal",
      "Mengubah warna"
    ],
    correctIndex: 1,
    explanation: "justify-content: center digunakan untuk memusatkan elemen secara horizontal di dalam flex container."
  }
},

{
  id: "javascript",
  title: "JavaScript",
  icon: "/Icon/javascript.png",
  group: "frontend",
  description: "JavaScript adalah bahasa pemrograman yang digunakan untuk membuat website menjadi interaktif. Jika HTML adalah struktur dan CSS adalah tampilan, maka JavaScript adalah logika dan perilaku dari sebuah halaman web. Dengan JavaScript, kita bisa membuat tombol yang bisa diklik, form yang divalidasi, animasi dinamis, hingga komunikasi dengan server.\n\nJavaScript berjalan di browser menggunakan engine seperti V8 dan mendukung paradigma pemrograman seperti procedural, object-oriented, dan functional programming. Konsep penting dalam JavaScript meliputi variabel, fungsi, conditional, loop, array, object, serta asynchronous programming seperti Promise dan async/await.\n\nSaat ini JavaScript tidak hanya digunakan di frontend, tetapi juga di backend melalui Node.js. Framework seperti React, Vue, dan Angular juga dibangun menggunakan JavaScript. Menguasai JavaScript berarti mampu membangun aplikasi web modern yang dinamis dan interaktif.",
  color: "from-zinc-500/20 to-gray-800/20",
  codeSnippet: `let angka = 10;
console.log(angka + 5);`,
  quiz: {
    code: `let a = 5;
let b = 3;
console.log(a * b);`,
    question: "Apa output dari kode tersebut?",
    options: ["8", "15", "53", "2"],
    correctIndex: 1,
    explanation: "Operator * digunakan untuk perkalian, sehingga 5 × 3 = 15."
  }
},

{
  id: "sql",
  title: "SQL",
  icon: "/Icon/mysql.png",
  group: "backend",
  description: "SQL (Structured Query Language) adalah bahasa yang digunakan untuk mengelola dan memanipulasi database relasional seperti MySQL, PostgreSQL, dan SQL Server. Dengan SQL, kita dapat menyimpan, mengambil, memperbarui, dan menghapus data secara terstruktur menggunakan perintah query. SQL sangat penting dalam pengembangan backend karena hampir semua aplikasi modern membutuhkan penyimpanan data yang terorganisir.\n\nSQL bekerja menggunakan konsep tabel yang terdiri dari baris (row) dan kolom (column). Setiap tabel memiliki struktur tertentu yang ditentukan menggunakan perintah CREATE TABLE. Kita bisa melakukan operasi dasar seperti SELECT untuk mengambil data, INSERT untuk menambah data, UPDATE untuk mengubah data, dan DELETE untuk menghapus data. Selain itu, SQL juga mendukung relasi antar tabel menggunakan primary key dan foreign key.\n\nDalam pengembangan web, SQL sering digunakan bersama backend seperti Node.js, PHP, atau Python untuk menghubungkan aplikasi dengan database. Memahami SQL membantu kita membangun sistem autentikasi, dashboard admin, sistem transaksi, dan berbagai aplikasi berbasis data lainnya.",
  color: "from-zinc-500/20 to-gray-800/20",
  codeSnippet: `SELECT * FROM users
WHERE age > 18;`,
  quiz: {
    code: `SELECT name FROM students;`,
    question: "Apa fungsi perintah SELECT pada SQL?",
    options: [
      "Menghapus data",
      "Mengubah struktur tabel",
      "Mengambil data dari tabel",
      "Menambahkan data baru"
    ],
    correctIndex: 2,
    explanation: "SELECT digunakan untuk mengambil atau membaca data dari tabel dalam database."
  }
}, 

{
  id: "algorithm",
  title: "Algorithm",
  icon: "/Icon/s.png",
  group: "computer science",
  description: "Algoritma adalah langkah-langkah logis dan sistematis untuk menyelesaikan suatu masalah. Dalam pemrograman, algoritma menjadi fondasi sebelum kita menulis kode. Dengan algoritma yang baik, program akan berjalan lebih efisien, mudah dipahami, dan minim kesalahan.\n\nAlgoritma bisa dituliskan dalam bentuk pseudocode, flowchart, atau langsung dalam bahasa pemrograman. Konsep penting dalam algoritma meliputi percabangan (if-else), perulangan (loop), serta struktur data seperti array dan stack. Selain itu, terdapat berbagai teknik penyelesaian masalah seperti brute force, divide and conquer, dan greedy algorithm.\n\nPemahaman algoritma sangat penting dalam wawancara kerja bidang IT dan kompetisi coding. Banyak platform seperti LeetCode dan HackerRank menguji kemampuan logika dan efisiensi algoritma seseorang.",
  color: "from-zinc-500/20 to-gray-800/20",
  codeSnippet: `function findMax(arr) {
  return Math.max(...arr);
}`,
  quiz: {
    code: `for (let i = 0; i < arr.length; i++) {}`,
    question: "Loop di atas memiliki kompleksitas waktu apa?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n²)"
    ],
    correctIndex: 2,
    explanation: "Loop yang berjalan sebanyak panjang array memiliki kompleksitas waktu O(n)."
  }
},

{
  id: "python",
  title: "Python",
  icon: "/Icon/python.png",
  group: "backend",
  description: "Python adalah bahasa pemrograman yang terkenal karena sintaksnya yang sederhana dan mudah dipahami. Python banyak digunakan dalam pengembangan backend, data science, artificial intelligence, machine learning, hingga automation. Struktur kodenya yang bersih membuat Python sangat cocok untuk pemula maupun profesional.\n\nPython memiliki banyak library powerful seperti Pandas untuk pengolahan data, NumPy untuk komputasi numerik, dan TensorFlow untuk machine learning. Selain itu, framework seperti Django dan Flask memungkinkan pengembang membangun aplikasi web dengan cepat.\n\nKarena fleksibilitas dan komunitasnya yang besar, Python menjadi salah satu bahasa paling populer di dunia dan sering direkomendasikan sebagai bahasa pertama untuk belajar programming.",
  color: "from-zinc-500/20 to-gray-800/20",
  codeSnippet: `for i in range(3):
    print(i)`,
  quiz: {
    code: `x = 10
if x > 5:
    print("Besar")`,
    question: "Apa yang akan ditampilkan?",
    options: ["Kecil", "Besar", "Error", "Tidak ada output"],
    correctIndex: 1,
    explanation: "Karena 10 lebih besar dari 5, maka kondisi bernilai true dan mencetak 'Besar'."
  }
},

{
  id: "java",
  title: "Java",
  icon: "/Icon/java.png",
  group: "backend",
  description:  "Java adalah bahasa pemrograman berbasis objek (OOP) yang banyak digunakan untuk membangun aplikasi enterprise, Android, dan sistem backend skala besar. Java dikenal dengan prinsip 'Write Once, Run Anywhere' karena berjalan di atas Java Virtual Machine (JVM).\n\nKonsep penting dalam Java meliputi class, object, inheritance, encapsulation, dan polymorphism. Java juga memiliki sistem tipe data yang kuat dan pengelolaan memori otomatis melalui garbage collection.\n\nBanyak perusahaan besar menggunakan Java karena stabilitas dan skalabilitasnya. Framework seperti Spring Boot memungkinkan pengembang membangun REST API dan aplikasi backend modern dengan efisien.",
  color: "from-zinc-500/20 to-gray-800/20",
  codeSnippet: `int angka = 5;
System.out.println(angka);`,
  quiz: {
    code: `int a = 2;
int b = 4;
System.out.println(a + b);`,
    question: "Apa output dari kode tersebut?",
    options: ["6", "24", "8", "Error"],
    correctIndex: 0,
    explanation: "Operator + pada integer akan menjumlahkan nilai 2 dan 4 sehingga menghasilkan 6."
  }
},

{
  id: "php",
  title: "PHP",
  icon: "/Icon/php.png",
  group: "backend",
  description: "PHP adalah bahasa pemrograman server-side yang banyak digunakan untuk pengembangan website dinamis. PHP sering digunakan bersama database seperti MySQL untuk membuat sistem login, dashboard admin, dan aplikasi berbasis web lainnya.\n\nPHP berjalan di sisi server dan menghasilkan output dalam bentuk HTML yang dikirim ke browser pengguna. Framework populer seperti Laravel membuat pengembangan aplikasi PHP menjadi lebih modern, terstruktur, dan aman.\n\nMeskipun tergolong bahasa lama, PHP masih digunakan oleh banyak website besar di dunia dan menjadi fondasi dari sistem manajemen konten seperti WordPress.",
  color: "from-zinc-500/20 to-gray-800/20",
  codeSnippet: `<?php
echo "Halo Dunia";
?>`,
  quiz: {
    code: `<?php
$x = 5;
$y = 10;
echo $x + $y;
?>`,
    question: "Apa output dari kode tersebut?",
    options: ["510", "15", "5", "Error"],
    correctIndex: 1,
    explanation: "PHP menggunakan operator + untuk menjumlahkan angka sehingga hasilnya 15."
  }
},

{
  id: "react",
  title: "React",
  icon: "/Icon/react.png",
  group: "frontend",
  description: "React adalah library JavaScript yang digunakan untuk membangun user interface (UI), terutama untuk aplikasi berbasis web single-page application (SPA). React dikembangkan oleh Facebook dan memungkinkan developer membangun UI menggunakan pendekatan komponen (component-based architecture). Setiap bagian UI dapat dipisah menjadi komponen kecil yang reusable dan mudah dikelola.\n\nReact menggunakan konsep Virtual DOM untuk meningkatkan performa. Ketika terjadi perubahan state, React tidak langsung mengubah DOM asli, tetapi membandingkannya terlebih dahulu melalui proses yang disebut reconciliation. Hal ini membuat aplikasi menjadi lebih cepat dan efisien.\n\nKonsep penting dalam React meliputi JSX, props, state, lifecycle, dan hooks seperti useState serta useEffect. Dengan React, developer dapat membangun aplikasi interaktif seperti dashboard, sistem manajemen, hingga aplikasi skala besar dengan struktur yang rapi dan scalable.",
  color: "from-zinc-500/20 to-gray-800/20",
  codeSnippet: `function Halo() {
  return <h1>Halo React</h1>;
}`,
  quiz: {
    code: `const [count, setCount] = useState(0);
setCount(count + 1);`,
    question: "Apa fungsi useState pada React?",
    options: [
      "Mengatur routing",
      "Mengelola state pada komponen",
      "Menghubungkan database",
      "Membuat animasi"
    ],
    correctIndex: 1,
    explanation: "useState digunakan untuk menyimpan dan mengelola data (state) di dalam komponen React."
  }
}, 

{
  id: "typescript",
  title: "TypeScript",
  icon: "/Icon/typescript.png",
  group: "frontend",
  description: "TypeScript adalah superset dari JavaScript yang menambahkan fitur static typing. Artinya, kita bisa menentukan tipe data variabel, parameter, dan return function secara eksplisit. Dengan TypeScript, kode menjadi lebih aman karena error dapat terdeteksi saat proses development, bukan saat runtime.\n\nTypeScript sangat populer dalam pengembangan aplikasi besar karena membantu menjaga konsistensi dan struktur kode. Fitur seperti interface, type alias, enum, dan generics membuat pengelolaan data menjadi lebih terorganisir dan scalable.\n\nTypeScript sering digunakan bersama React dan framework modern lainnya. Banyak perusahaan besar menggunakan TypeScript untuk meningkatkan maintainability dan mengurangi bug pada proyek jangka panjang.",
  color: "from-zinc-500/20 to-gray-800/20",
  codeSnippet: `function greet(name: string): string {
  return "Hello " + name;
}`,
  quiz: {
    code: `let age: number = 20;`,
    question: "Apa fungsi penulisan ': number' pada kode di atas?",
    options: [
      "Membuat variabel menjadi private",
      "Menentukan tipe data variabel",
      "Mengubah nilai variabel",
      "Membuat variabel global"
    ],
    correctIndex: 1,
    explanation: "TypeScript menggunakan anotasi tipe untuk memastikan variabel memiliki tipe data tertentu."
  }
},

{
  id: "nextjs",
  title: "Next.js",
  icon: "/Icon/nodejs.png",
  group: "frontend",
  description: "Next.js adalah framework berbasis React yang digunakan untuk membangun aplikasi web modern dengan fitur tambahan seperti server-side rendering (SSR), static site generation (SSG), dan routing otomatis. Next.js mempermudah pengembangan aplikasi yang SEO-friendly dan memiliki performa tinggi.\n\nSalah satu keunggulan Next.js adalah sistem routing berbasis file. Setiap file di dalam folder pages atau app otomatis menjadi route. Selain itu, Next.js mendukung API routes yang memungkinkan kita membuat backend sederhana dalam satu proyek.\n\nNext.js banyak digunakan untuk membangun website perusahaan, blog, landing page, dan aplikasi full-stack modern. Dengan fitur optimasi gambar, middleware, dan dukungan deployment mudah ke Vercel, Next.js menjadi pilihan populer di kalangan developer React.",
  color: "from-zinc-500/20 to-gray-800/20",
  codeSnippet: `export default function Home() {
  return <h1>Welcome to Next.js</h1>;
}`,
  quiz: {
    code: `app/page.tsx`,
    question: "Apa fungsi file page.tsx dalam folder app pada Next.js?",
    options: [
      "Mengatur database",
      "Membuat halaman utama",
      "Mengatur styling global",
      "Membuat API"
    ],
    correctIndex: 1,
    explanation: "Dalam Next.js App Router, file page.tsx digunakan untuk membuat halaman pada route tertentu."
  }
},

{
  id: "git",
  title: "Git",
  icon: "/Icon/s.png",
  group: "tools",
  description: "Git adalah version control system yang digunakan untuk melacak perubahan kode dan mengelola kolaborasi dalam tim. Dengan Git, kita dapat melihat riwayat perubahan, kembali ke versi sebelumnya, serta bekerja bersama developer lain tanpa konflik yang berantakan.\n\nGit bekerja menggunakan konsep repository, commit, branch, dan merge. Repository adalah tempat penyimpanan proyek, commit adalah catatan perubahan, branch digunakan untuk membuat fitur baru tanpa mengganggu kode utama, dan merge digunakan untuk menggabungkan perubahan.\n\nDalam praktiknya, Git sering digunakan bersama platform seperti GitHub atau GitLab untuk kolaborasi online. Menguasai Git sangat penting dalam dunia kerja karena hampir semua tim pengembangan software menggunakannya.",
  color: "from-zinc-500/20 to-gray-800/20",
  codeSnippet: `git init
git add .
git commit -m "Initial commit"`,
  quiz: {
    code: `git branch feature-login`,
    question: "Apa fungsi perintah di atas?",
    options: [
      "Menghapus branch",
      "Membuat branch baru bernama feature-login",
      "Menggabungkan branch",
      "Mengirim branch ke GitHub"
    ],
    correctIndex: 1,
    explanation: "Perintah git branch digunakan untuk membuat branch baru tanpa langsung berpindah ke branch tersebut."
  }
},

];