// # BẢN HỌC MÃ KANSOU: dòng bắt đầu bằng // # là lời giải thích, không chạy như lệnh.
// # Đọc từng hàm: lấy dữ liệu -> xử lý -> cập nhật giao diện hoặc lưu vào trình duyệt.

/* ĐĂNG KÝ, ĐĂNG NHẬP VÀ HỒ SƠ
   Cùng một tệp được dùng ở ba trang. if kiểm tra form nào đang có trên trang. */

// # Đổi type của ô giữa password và text để ẩn/hiện mật khẩu.
function hienMatKhau(id, nut) {
  var oNhap = lay(id);
  var dangAn = oNhap.type === 'password';
  oNhap.type = dangAn ? 'text' : 'password';
  nut.setAttribute('aria-label', dangAn ? 'Ẩn mật khẩu' : 'Hiện mật khẩu');
  nut.setAttribute('aria-pressed', String(dangAn));
}

// # Khi bỏ trống ô required, trình duyệt hiện lời nhắc mặc định; đổi thành câu thống nhất.
// # Các lỗi khác (quá ngắn, sai email...) vẫn dùng lời nhắc có sẵn của trình duyệt.
var cacOBatBuoc = document.querySelectorAll('form [required]');
for (var k = 0; k < cacOBatBuoc.length; k++) {
  cacOBatBuoc[k].oninvalid = function () {
    this.setCustomValidity(this.validity.valueMissing ? 'Ô yêu cầu bắt buộc điền.' : '');
  };
  // # Xóa lời nhắc tùy chỉnh ngay khi người dùng gõ để ô được kiểm tra lại.
  cacOBatBuoc[k].oninput = function () { this.setCustomValidity(''); };
}

// # Chỉ gắn sự kiện khi trang có nút Google; bản bài tập hiện thông báo chưa kết nối.
if (lay('google')) {
  lay('google').onclick = function () {
    thongBao('Bản bài tập chưa kết nối Google. Bạn có thể đăng ký bằng email.');
  };
}

// # PHẦN 07 — ĐĂNG KÝ: chỉ chạy khối này khi mở dang-ky.html.
if (lay('form-dang-ky')) {
  // # Khi đăng ký, kiểm tra các ô, băm mật khẩu rồi lưu tài khoản mới.
  lay('form-dang-ky').onsubmit = async function (suKien) {
    // # Ngăn hành vi gửi form tải lại trang để JavaScript kiểm tra và xử lý trước.
    suKien.preventDefault();
    var ten = lay('ten-dang-ky').value.trim();
    var email = lay('email-dang-ky').value.trim().toLowerCase();
    var matKhau = lay('mat-khau-dang-ky').value;
    var nut = this.querySelector('button[type="submit"]');
    try {
      kiemTraHoSo(ten, email);
      if (matKhau.length < 8 || matKhau.length > 128) { throw new Error('Mật khẩu cần từ 8 đến 128 ký tự.'); }
      if (matKhau !== lay('xac-nhan').value) { throw new Error('Mật khẩu xác nhận chưa trùng khớp.'); }
      kiemTraTrung(ten, email, '');
      nut.disabled = true;
      // # Tạo muối ngẫu nhiên riêng cho tài khoản để chuỗi băm không chỉ phụ thuộc mật khẩu.
      var muoi = taoMa();
      // # Tạo mã khôi phục để người dùng tự lưu; bản này không gửi email.
      var maKhoiPhuc = taoMa();
      var matKhauBam = await bamMatKhau(matKhau, muoi);
      var khoiPhucBam = await bamMatKhau(maKhoiPhuc, muoi);
      var kho = docKho();
      // Đọc và kiểm tra lần nữa sau khi băm, trước khi ghi vào kho.
      kiemTraTrung(ten, email, '');
      // # Đối tượng tài khoản mới, kèm mảng phim đã lưu và lịch sử xem ban đầu rỗng.
      var nguoi = { id: taoMa(), ten: ten, email: email, muoi: muoi, matKhau: matKhauBam, khoiPhuc: khoiPhucBam, avatar: '', daLuu: [], lichSu: [] };
      kho.taiKhoan.push(nguoi);
      // # Ghi id người đang đăng nhập vào phiên của kho dữ liệu.
      kho.phien = nguoi.id;
      luuKho(kho);
      lay('loi-dang-ky').textContent = '';
      lay('ma-vua-tao').textContent = maKhoiPhuc;
      lay('dang-ky-xong').showModal();
    } catch (loi) { lay('loi-dang-ky').textContent = loi.message; }
    nut.disabled = false;
  };
}

// # PHẦN 06 — ĐĂNG NHẬP: chỉ chạy khối này khi mở dang-nhap.html.
if (lay('form-dang-nhap')) {
  lay('tai-khoan').value = localStorage.getItem('kansou-ten-ghi-nho') || '';
  lay('ghi-nho').checked = Boolean(lay('tai-khoan').value);
  lay('mat-khau').autocomplete = 'current-password';
  // # Tìm tài khoản theo tên/email và so sánh chuỗi băm trước khi cho đăng nhập.
  lay('form-dang-nhap').onsubmit = async function (suKien) {
    // # Ngăn hành vi gửi form tải lại trang để JavaScript kiểm tra và xử lý trước.
    suKien.preventDefault();
    var tenNhap = lay('tai-khoan').value.trim().toLowerCase();
    var matKhau = lay('mat-khau').value;
    var nut = this.querySelector('button[type="submit"]');
    nut.disabled = true;
    try {
      var kho = docKho();
      var nguoi = null;
      for (var i = 0; i < kho.taiKhoan.length; i++) {
        if (kho.taiKhoan[i].ten.toLowerCase() === tenNhap || kho.taiKhoan[i].email === tenNhap) { nguoi = kho.taiKhoan[i]; }
      }
      if (!nguoi || nguoi.matKhau !== await bamMatKhau(matKhau, nguoi.muoi)) { throw new Error('Tên đăng nhập, email hoặc mật khẩu chưa đúng.'); }
      // # Ghi id người đang đăng nhập vào phiên của kho dữ liệu.
      kho.phien = nguoi.id;
      luuKho(kho);
      if (lay('ghi-nho').checked) { localStorage.setItem('kansou-ten-ghi-nho', lay('tai-khoan').value.trim()); }
      else { localStorage.removeItem('kansou-ten-ghi-nho'); }
      quayLaiSauDangNhap();
    } catch (loi) { lay('loi-dang-nhap').textContent = loi.message; }
    nut.disabled = false;
  };
  // # Đổi mật khẩu khi email và mã khôi phục khớp dữ liệu trên trình duyệt.
  lay('form-khoi-phuc').onsubmit = async function (suKien) {
    // # Ngăn hành vi gửi form tải lại trang để JavaScript kiểm tra và xử lý trước.
    suKien.preventDefault();
    try {
      var kho = docKho();
      var email = lay('email-khoi-phuc').value.trim().toLowerCase();
      var nguoi = null;
      for (var i = 0; i < kho.taiKhoan.length; i++) { if (kho.taiKhoan[i].email === email) { nguoi = kho.taiKhoan[i]; } }
      if (!nguoi || nguoi.khoiPhuc !== await bamMatKhau(lay('ma-khoi-phuc').value.trim(), nguoi.muoi)) { throw new Error('Email hoặc mã khôi phục chưa đúng.'); }
      if (lay('mat-khau-moi').value.length < 8) { throw new Error('Mật khẩu cần ít nhất 8 ký tự.'); }
      nguoi.matKhau = await bamMatKhau(lay('mat-khau-moi').value, nguoi.muoi);
      kho.phien = '';
      luuKho(kho);
      this.reset(); lay('quen-mat-khau').close();
      thongBao('Đã đổi mật khẩu. Hãy đăng nhập bằng mật khẩu mới.');
    } catch (loi) { lay('loi-khoi-phuc').textContent = loi.message; }
  };
}

// # Biến tạm giữ ảnh avatar người dùng vừa chọn, chưa lưu vào hồ sơ.
var avatarMoi = '';
var moRongLichSu = false;
// # Điền tên, email, avatar, lịch sử xem và review của người đang đăng nhập.
function hienHoSo() {
  var nguoi = nguoiDangNhap();
  if (!nguoi) { canDangNhap(); return; }
  lay('ten-ho-so').textContent = nguoi.ten;
  lay('email-ho-so').textContent = nguoi.email;
  lay('anh-dai-dien').src = nguoi.avatar || 'images/96f70.png';
  lay('anh-dai-dien').alt = 'Ảnh đại diện của ' + nguoi.ten;
  var html = '';
  var gioiHan = moRongLichSu ? 30 : 4;
  for (var i = 0; i < Math.min(gioiHan, nguoi.lichSu.length); i++) {
    var anime = timAnime(nguoi.lichSu[i]);
    if (anime) { html += '<a class="history-card" href="' + linkChiTiet(anime.id) + '"><img src="' + anToan(anime.poster) + '" alt=""><div><strong>' + anToan(anime.title) + '</strong><p>' + anToan(anime.synopsis) + '</p></div></a>'; }
  }
  lay('lich-su-xem').innerHTML = html || '<p class="muted">Bạn chưa xem anime nào. <a class="yellow" href="danh-muc.html?tatca=1">Khám phá ngay.</a></p>';
  lay('xem-lich-su').textContent = moRongLichSu ? 'Thu gọn' : 'Xem tất cả ↗';
  html = '';
  var reviews = docKho().reviews;
  for (var i = 0; i < reviews.length; i++) {
    var review = reviews[i];
    var anime = timAnime(review.animeId);
    if (review.nguoiId === nguoi.id && anime) {
      html += '<article class="profile-review"><a href="' + linkChiTiet(anime.id) + '"><img src="' + anToan(anime.poster) + '" alt="Poster ' + anToan(anime.title) + '"></a><div><h3><a href="' + linkChiTiet(anime.id) + '">' + anToan(anime.title) + '</a></h3><small>' + new Date(review.ngay).toLocaleDateString('vi-VN') + '</small><div class="score">★ ' + review.diem + '/5</div><p>' + anToan(review.noiDung) + '</p><button class="text-button" data-xoa-review="' + review.id + '">Xóa review</button></div></article>';
    }
  }
  lay('lich-su-review').innerHTML = html || vungTrong('Chưa có review', 'Viết cảm nhận đầu tiên về bộ anime bạn yêu thích.', 'review.html', 'Viết review');
}

// # PHẦN 08 — TÀI KHOẢN: chỉ chạy khối này khi mở tai-khoan.html.
if (lay('ten-ho-so')) {
  hienHoSo();
  // # Xóa id phiên đăng nhập, giữ lại tài khoản đã tạo rồi mở trang Đăng nhập.
  lay('dang-xuat').onclick = function () {
    try { var kho = docKho(); kho.phien = ''; luuKho(kho); location.href = 'dang-nhap.html'; }
    catch (loi) { thongBao(loi.message, true); }
  };
  lay('xem-lich-su').onclick = function () { moRongLichSu = !moRongLichSu; hienHoSo(); };
  // # Đưa tên/email hiện tại vào hộp thoại để người dùng sửa.
  lay('sua-ho-so').onclick = function () {
    var nguoi = nguoiDangNhap();
    lay('ten-moi').value = nguoi.ten; lay('email-moi').value = nguoi.email;
    avatarMoi = ''; lay('anh-moi').value = ''; lay('loi-ho-so').textContent = '';
    lay('sua-thong-tin').showModal();
  };
  // # Đọc ảnh đại diện vừa chọn; chỉ ghi vào hồ sơ khi bấm Lưu thay đổi.
  lay('anh-moi').onchange = function () { docAnh(this.files[0], function (anh) { avatarMoi = anh; }); };
  // # Kiểm tra tên/email không trùng rồi cập nhật hồ sơ và ảnh mới.
  lay('form-ho-so').onsubmit = function (suKien) {
    // # Ngăn hành vi gửi form tải lại trang để JavaScript kiểm tra và xử lý trước.
    suKien.preventDefault();
    try {
      var nguoi = nguoiDangNhap();
      var ten = lay('ten-moi').value.trim();
      var email = lay('email-moi').value.trim().toLowerCase();
      kiemTraHoSo(ten, email); kiemTraTrung(ten, email, nguoi.id);
      nguoi.ten = ten; nguoi.email = email;
      if (avatarMoi) { nguoi.avatar = avatarMoi; }
      capNhatNguoiDung(nguoi);
      lay('sua-thong-tin').close(); hienHoSo(); thongBao('Đã lưu thông tin cá nhân.');
    } catch (loi) { lay('loi-ho-so').textContent = loi.message; }
  };
  // # Xử lý nút Xóa review; chỉ xóa review thuộc người đang đăng nhập.
  lay('lich-su-review').onclick = function (suKien) {
    var nut = suKien.target.closest('[data-xoa-review]');
    if (!nut || !confirm('Xóa review này?')) { return; }
    try {
      var kho = docKho();
      var nguoi = nguoiDangNhap();
      for (var i = kho.reviews.length - 1; i >= 0; i--) {
        if (kho.reviews[i].id === nut.dataset.xoaReview && kho.reviews[i].nguoiId === nguoi.id) { kho.reviews.splice(i, 1); }
      }
      luuKho(kho); hienHoSo(); thongBao('Đã xóa review.');
    } catch (loi) { thongBao(loi.message, true); }
  };
}
