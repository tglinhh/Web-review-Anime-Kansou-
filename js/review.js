// # BẢN HỌC MÃ KANSOU: dòng bắt đầu bằng // # là lời giải thích, không chạy như lệnh.
// # Đọc từng hàm: lấy dữ liệu -> xử lý -> cập nhật giao diện hoặc lưu vào trình duyệt.

/* VIẾT REVIEW
   1. Chọn anime để điền dữ liệu có sẵn.
   2. Chọn sao và kiểm tra form.
   3. Lưu review vào localStorage, rồi chuyển tới trang chi tiết. */
// # Giữ số sao đang chọn; ban đầu là 0 để bắt buộc người viết chọn điểm.
var diemReview = 0;
// # Giữ đường dẫn hoặc dữ liệu ảnh poster đang được dùng cho review.
var posterReview = '';
var idDuocChon = new URLSearchParams(location.search).get('id') || '';
// # Lấy thư viện anime để tạo gợi ý tên và tự điền form.
var cacAnime = tatCaAnime();
for (var i = 0; i < cacAnime.length; i++) {
  var luaChon = document.createElement('option');
  luaChon.value = cacAnime[i].title;
  lay('ten-anime-goi-y').appendChild(luaChon);
}

// # Tự điền các ô của form review bằng thông tin anime đã có trong dữ liệu.
function dienAnime(anime) {
  if (!anime) { return; }
  idDuocChon = anime.id;
  // # Tên các trường dữ liệu tương ứng với id review-title, review-author... trong HTML.
  var cacTruong = ['title', 'author', 'year', 'country', 'episodes', 'synopsis'];
  for (var i = 0; i < cacTruong.length; i++) {
    lay('review-' + cacTruong[i]).value = anime[cacTruong[i]] || '';
  }
  lay('review-genres').value = anime.genres.join(', ');
  var nhanVat = [];
  for (var i = 0; i < anime.characters.length; i++) { nhanVat.push(anime.characters[i].name); }
  lay('review-characters').value = nhanVat.join(', ');
  posterReview = anime.detailPoster || anime.poster;
  hienPoster();
}
// # Đổi ảnh xem trước sang poster đã chọn; chưa có thì dùng ảnh chờ.
function hienPoster() {
  lay('poster-review').src = posterReview || 'images/474c5.png';
  lay('poster-review').className = posterReview ? '' : 'upload-placeholder';
  lay('poster-review').alt = posterReview ? 'Poster anime đang review' : 'Chưa chọn poster';
}
// # Lưu số sao đang chọn và tô sáng các nút sao tương ứng.
function chonDiem(diem) {
  diemReview = diem;
  lay('diem-da-chon').textContent = diem + ' / 5';
  var cacNut = document.querySelectorAll('#chon-sao button');
  for (var i = 0; i < cacNut.length; i++) {
    cacNut[i].className = i < diem ? 'chosen' : '';
    cacNut[i].setAttribute('aria-pressed', String(i < diem));
  }
}
// # Đọc các ô đang nhập và giữ bản nháp trong sessionStorage để tránh mất khi chuyển trang.
function luuBanNhap() {
  // # Gom id anime, điểm, poster và nội dung các ô thành một bản nháp.
  var nhap = { id: idDuocChon, diem: diemReview, poster: posterReview, truong: {} };
  var cacO = document.querySelectorAll('#form-review input, #form-review textarea');
  for (var i = 0; i < cacO.length; i++) { nhap.truong[cacO[i].name] = cacO[i].value; }
  try { sessionStorage.setItem('kansou-ban-nhap', JSON.stringify(nhap)); } catch (loi) { thongBao('Không lưu được bản nháp, hãy thử ảnh nhỏ hơn.', true); }
}

dienAnime(timAnime(idDuocChon));
try {
  // # Khôi phục bản nháp của phiên trình duyệt nếu người dùng đã nhập trước đó.
  var banNhap = JSON.parse(sessionStorage.getItem('kansou-ban-nhap'));
  if (banNhap && (!idDuocChon || banNhap.id === idDuocChon)) {
    for (var ten in banNhap.truong) { if (lay('review-' + ten)) { lay('review-' + ten).value = banNhap.truong[ten]; } }
    idDuocChon = banNhap.id; posterReview = banNhap.poster;
    chonDiem(banNhap.diem); hienPoster();
  }
} catch (loi) { thongBao('Không khôi phục được bản nháp.', true); }

// # Khi đổi tên anime, tìm xem tên đó đã có chưa để tự điền thông tin.
lay('review-title').onchange = function () {
  idDuocChon = '';
  for (var i = 0; i < cacAnime.length; i++) {
    if (boDau(cacAnime[i].title) === boDau(this.value.trim())) { dienAnime(cacAnime[i]); break; }
  }
  luuBanNhap();
};
// # Mỗi lần thay đổi nội dung form thì lưu lại bản nháp.
lay('form-review').oninput = luuBanNhap;
// # Đọc data-diem trên nút sao để chọn điểm và lưu nháp.
lay('chon-sao').onclick = function (suKien) {
  var nut = suKien.target.closest('[data-diem]');
  if (nut) { chonDiem(Number(nut.dataset.diem)); luuBanNhap(); }
};
// # Nút Tải poster mở ô chọn tệp ảnh đang ẩn.
lay('nut-tai-poster').onclick = function () { lay('anh-poster').click(); };
// # Khi chọn ảnh xong, đọc ảnh, cập nhật xem trước và giữ trong bản nháp.
lay('anh-poster').onchange = function () {
  docAnh(this.files[0], function (anh) { posterReview = anh; hienPoster(); luuBanNhap(); });
};
// # Xin xác nhận trước khi xóa bản nháp và về trang chủ.
lay('huy-review').onclick = function () {
  if (confirm('Hủy và xóa bản nháp đang viết?')) { sessionStorage.removeItem('kansou-ban-nhap'); location.href = 'index.html'; }
};
if (!nguoiDangNhap()) {
  lay('nhac-dang-nhap').innerHTML = 'Bạn cần <a href="dang-nhap.html" id="dang-nhap-review">đăng nhập</a> để đăng review. Bản nháp được giữ trong phiên này.';
  lay('dang-nhap-review').onclick = function (e) { e.preventDefault(); luuBanNhap(); canDangNhap(); };
}

// # Ngăn tải lại trang; kiểm tra dữ liệu trước khi tạo anime mới và lưu review.
lay('form-review').onsubmit = function (suKien) {
  suKien.preventDefault(); luuBanNhap();
  if (!canDangNhap()) { return; }
  var ten = lay('review-title').value.trim();
  var noiDung = lay('review-body').value.trim();
  if (!ten || !noiDung || !lay('review-country').value.trim() || !lay('review-genres').value.trim() || !lay('review-synopsis').value.trim()) {
    lay('loi-review').textContent = 'Hãy điền các trường bắt buộc, không chỉ nhập khoảng trắng.'; return;
  }
  // # Không cho đăng nếu chưa chọn điểm từ 1 đến 5 sao.
  if (diemReview < 1 || diemReview > 5) { lay('loi-review').textContent = 'Hãy chọn từ 1 đến 5 sao.'; return; }
  // Tìm lại theo tên hiện tại, tránh dùng nhầm id của tên đã xóa.
  idDuocChon = '';
  for (var i = 0; i < cacAnime.length; i++) {
    if (boDau(cacAnime[i].title) === boDau(ten)) { idDuocChon = cacAnime[i].id; break; }
  }
  if (!idDuocChon && !posterReview) { lay('loi-review').textContent = 'Hãy tải poster khi thêm anime mới.'; return; }
  try {
    var kho = docKho();
    var nguoi = nguoiDangNhap();
    if (!idDuocChon) {
      idDuocChon = 'anime-' + taoMa();
      var cacTen = lay('review-characters').value.split(',');
      var nhanVat = [];
      for (var i = 0; i < cacTen.length; i++) {
        if (cacTen[i].trim()) { nhanVat.push({ name: cacTen[i].trim(), role: 'Nhân vật', traits: '' }); }
      }
      // # Nếu tên anime chưa có, lưu đối tượng anime người dùng vừa bổ sung vào kho cục bộ.
      kho.animeMoi.push({ id: idDuocChon, title: ten, nativeTitle: ten, author: lay('review-author').value.trim(), year: Number(lay('review-year').value) || '', country: lay('review-country').value.trim(), studio: 'Người dùng bổ sung', type: 'TV', season: '', genres: lay('review-genres').value.split(','), episodes: lay('review-episodes').value.trim(), characters: nhanVat, synopsis: lay('review-synopsis').value.trim(), poster: posterReview, detailPoster: posterReview, sampleRating: null, analysis: '', relationships: '', themes: [], versions: 'Nội dung người dùng đóng góp', originalStatus: 'Chưa đối chiếu', chapters: 'Chưa có dữ liệu', volumes: 'Chưa có dữ liệu', sources: [] });
    }
    // # Thêm review mới vào đầu danh sách, gắn với anime và người đang đăng nhập.
    kho.reviews.unshift({ id: taoMa(), animeId: idDuocChon, nguoiId: nguoi.id, ten: nguoi.ten, diem: diemReview, noiDung: noiDung, ngay: new Date().toISOString() });
    luuKho(kho);
    // # Đã đăng thành công thì xóa bản nháp để lần sau không điền lại nội dung cũ.
    sessionStorage.removeItem('kansou-ban-nhap');
    location.href = linkChiTiet(idDuocChon);
  } catch (loi) { lay('loi-review').textContent = loi.message; }
};
