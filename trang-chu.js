// # BẢN HỌC MÃ KANSOU: dòng bắt đầu bằng // # là lời giải thích, không chạy như lệnh.
// # Đọc từng hàm: lấy dữ liệu -> xử lý -> cập nhật giao diện hoặc lưu vào trình duyệt.

/* TRANG CHỦ: hai nhóm có liên kết; bảng xếp hạng và đánh giá cao
   đã viết tĩnh trong index.html nên không cần JavaScript riêng. */

// # Mảng 6 mã anime thuộc mục Anime nổi bật; đổi mã ở đây để đổi danh sách.
var animeNoiBat = ['mob-psycho-100', 'sakamoto-days', 'attack-on-titan', 'violet-evergarden', 'demon-slayer', 'blue-lock'];
// # Mảng 4 mã anime của mục Mới được thêm gần đây.
var animeMoiThem = ['chainsaw-man', 'kimi-ni-todoke', 'my-hero-academia', 'hunter-x-hunter'];
var htmlNoiBat = '';
var htmlMoi = '';

// # Lặp từng anime nổi bật, tạo thẻ poster và cộng dồn thành chuỗi HTML.
for (var i = 0; i < animeNoiBat.length; i++) {
  var theAnime = thePoster(timAnime(animeNoiBat[i]));
  if (i < 3) { theAnime = theAnime.replace('poster-card', 'poster-card anh-can-tren'); }
  htmlNoiBat += theAnime;
}
// # Đưa chuỗi thẻ poster vừa tạo vào vùng Anime nổi bật trong index.html.
lay('anime-noi-bat').innerHTML = htmlNoiBat;

/* CHUYỂN ĐỘNG ANIME NỔI BẬT
   Lặp lại 6 thẻ một lần để hàng ảnh trượt liên tục, không bị nhảy về đầu.
   CSS lo việc chuyển động; JavaScript chỉ tạo bản sao và nút dừng. */
// # Lấy hàng poster để thêm bản sao và điều khiển việc tạm dừng.
var hangNoiBat = lay('anime-noi-bat');
var cacTheGoc = hangNoiBat.querySelectorAll('a');
for (var i = 0; i < cacTheGoc.length; i++) {
  // # cloneNode(true) sao chép cả thẻ và nội dung con để nối vòng chuyển động.
  var banSao = cacTheGoc[i].cloneNode(true);
  banSao.classList.add('ban-sao');
  // # Bản sao chỉ phục vụ hình ảnh; tránh đọc lặp cho người dùng trình đọc màn hình.
  banSao.setAttribute('aria-hidden', 'true');
  // # Bỏ bản sao khỏi thứ tự phím Tab để bàn phím chỉ đi qua 6 thẻ gốc.
  banSao.tabIndex = -1;
  banSao.onmousedown = function (e) { e.preventDefault(); };
  hangNoiBat.appendChild(banSao);
}
// # Bấm nút thì thêm/bỏ lớp tam-dung; CSS đọc lớp này để dừng/chạy hàng ảnh.
lay('dung-noi-bat').onclick = function () {
  var dung = hangNoiBat.classList.toggle('tam-dung');
  this.textContent = dung ? 'Chạy tiếp' : 'Tạm dừng';
  this.setAttribute('aria-pressed', String(dung));
};
// Tiết kiệm tài nguyên: chỉ chạy khi hàng anime đang xuất hiện trên màn hình.
var thayNoiBat = false;
// # Tạm dừng hàng poster nếu nó ra khỏi màn hình hoặc người xem chuyển tab trình duyệt.
function capNhatChuyenDong() {
  hangNoiBat.classList.toggle('ngoai-man-hinh', !thayNoiBat || document.hidden);
}
// # Theo dõi hàng ảnh còn nằm trong vùng nhìn thấy để tiết kiệm chuyển động.
new IntersectionObserver(function (cacMuc) {
  thayNoiBat = cacMuc[0].isIntersecting;
  capNhatChuyenDong();
}).observe(hangNoiBat.parentElement);
document.addEventListener('visibilitychange', capNhatChuyenDong);

// # Tạo 4 thẻ anime mới gồm ảnh, tên, thể loại, điểm và mô tả.
for (var i = 0; i < animeMoiThem.length; i++) {
  var anime = timAnime(animeMoiThem[i]);
  htmlMoi += '<a class="recent-card" href="' + linkChiTiet(anime.id) + '">' +
    '<img src="' + anime.poster + '" alt="Poster ' + anToan(anime.title) + '" loading="lazy">' +
    '<div><h3>' + anToan(anime.title) + '<span class="score">★ ' + layDiem(anime) + '</span></h3>' +
    '<p class="genres">' + anToan(anime.genres.slice(0, 4).join(', ')) + '</p>' +
    '<p class="description">' + anToan(anime.synopsis) + '</p></div></a>';
}
lay('anime-moi').innerHTML = htmlMoi;

// # Danh sách 3 anime dùng cho hai mũi tên chuyển banner.
var cacGioiThieu = ['jujutsu-kaisen-hidden-inventory', 'sakamoto-days', 'violet-evergarden'];
var thuTuGioiThieu = 0;

// # Lấy anime đang được chọn để thay tên, mô tả, ảnh nền và nút lưu của banner.
function hienGioiThieu() {
  var anime = timAnime(cacGioiThieu[thuTuGioiThieu]);
  lay('hero-title').textContent = anime.title;
  if (thuTuGioiThieu === 0) {
    lay('hero-title').innerHTML = 'Chú thuật hồi chiến:<br>Hoài Ngọc/ Ngọc Chiết';
    lay('hero-meta').textContent = '4.8/ 5.0 (281 đánh giá) | 1h 50m • 2025 | Shonen, Hành động, Siêu nhiên';
  } else {
    lay('hero-meta').textContent = layDiem(anime) + '/ 5.0 | ' + anime.year + ' | ' + anime.genres.slice(0, 3).join(', ');
  }
  lay('hero-description').textContent = anime.synopsis;
  lay('hero-link').href = linkChiTiet(anime.id);
  var anhNen = anime.hero || anime.poster;
  lay('hero').style.backgroundImage = 'url("' + anhNen + '")';
  lay('hero-save').textContent = daLuu(anime.id) ? '✓ Đã lưu vào thư viện' : '+ Lưu vào thư viện';
}

// # Mũi tên trái giảm vị trí banner; phép % giúp quay vòng trong danh sách.
lay('hero-truoc').onclick = function () {
  thuTuGioiThieu = (thuTuGioiThieu + cacGioiThieu.length - 1) % cacGioiThieu.length;
  hienGioiThieu();
};
// # Mũi tên phải tăng vị trí banner rồi điền lại nội dung.
lay('hero-sau').onclick = function () {
  thuTuGioiThieu = (thuTuGioiThieu + 1) % cacGioiThieu.length;
  hienGioiThieu();
};
// # Lưu/bỏ lưu anime đang xuất hiện trên banner, sau đó cập nhật chữ nút.
lay('hero-save').onclick = function () {
  try {
    doiTrangThaiLuu(cacGioiThieu[thuTuGioiThieu]);
    hienGioiThieu();
  } catch (loi) { thongBao(loi.message, true); }
};
hienGioiThieu();
