// # BẢN HỌC MÃ KANSOU: dòng bắt đầu bằng // # là lời giải thích, không chạy như lệnh.
// # Đọc từng hàm: lấy dữ liệu -> xử lý -> cập nhật giao diện hoặc lưu vào trình duyệt.

/* CÁC HÀM DÙNG CHUNG
   getElementById, innerHTML, sự kiện và JSON được giới thiệu ở chương 6.
   Các hàm ngắn bên dưới tránh viết lại cùng một đoạn ở 8 trang. */

// # Tìm một phần tử HTML bằng id. Ví dụ lay("nut-tim") lấy nút có id="nut-tim".
function lay(id) {
  return document.getElementById(id);
}

// Chuyển ký tự đặc biệt trước khi đưa nội dung người dùng vào HTML.
// # Đổi ký tự đặc biệt thành chữ an toàn trước khi ghép nội dung người dùng vào HTML.
function anToan(noiDung) {
  return String(noiDung == null ? '' : noiDung)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// # Đổi chữ thành chữ thường và bỏ dấu tiếng Việt để tìm kiếm dễ hơn.
function boDau(chuoi) {
  return String(chuoi).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
}

// # Ghép anime có sẵn với anime mà người dùng đã thêm trong trình duyệt.
function tatCaAnime() {
  return danhSachAnime.concat(docKho().animeMoi);
}

// # Duyệt danh sách và trả về anime có id cần tìm; trả null nếu không có.
function timAnime(id) {
  var danhSach = tatCaAnime();
  for (var i = 0; i < danhSach.length; i++) {
    if (danhSach[i].id === id) { return danhSach[i]; }
  }
  return null;
}

// # Tạo địa chỉ chi-tiet.html?id=...; encodeURIComponent giúp mã anime hợp lệ trong URL.
function linkChiTiet(id) {
  return 'chi-tiet.html?id=' + encodeURIComponent(id);
}

// # Tính trung bình các review đã viết; nếu chưa có review thì dùng điểm mẫu Figma.
function layDiem(anime) {
  var reviews = docKho().reviews;
  var tong = 0;
  var soLuong = 0;
  for (var i = 0; i < reviews.length; i++) {
    if (reviews[i].animeId === anime.id) {
      tong += reviews[i].diem;
      soLuong++;
    }
  }
  if (soLuong > 0) { return (tong / soLuong).toFixed(1); }
  if (anime.sampleRating != null) { return anime.sampleRating.toFixed(1); }
  return '';
}

// # Ghép HTML của một thẻ poster gồm ảnh, tên, điểm và liên kết chi tiết.
function thePoster(anime) {
  var diem = layDiem(anime);
  var diemHTML = diem ? '<span class="score">★ ' + diem + '</span>' : '';
  return '<a class="poster-card" href="' + linkChiTiet(anime.id) + '">' +
    '<img src="' + anToan(anime.poster) + '" alt="Poster ' + anToan(anime.title) + '" loading="lazy">' +
    '<div class="poster-caption"><strong>' + anToan(anime.title) + '</strong>' + diemHTML + '</div></a>';
}

// # Dùng vòng lặp tạo nhiều thẻ poster rồi đặt vào vùng HTML có idVung.
function hienDanhSach(idVung, danhSach) {
  var html = '';
  for (var i = 0; i < danhSach.length; i++) { html += thePoster(danhSach[i]); }
  lay(idVung).innerHTML = html;
}

// # Tạo hộp thông báo khi chưa có dữ liệu; có thể kèm một nút điều hướng.
function vungTrong(tieuDe, moTa, duongDan, tenNut) {
  var nut = duongDan ? '<a class="button primary" href="' + duongDan + '">' + tenNut + '</a>' : '';
  return '<div class="empty-state"><h2>' + tieuDe + '</h2><p>' + moTa + '</p>' + nut + '</div>';
}

var henThongBao;
// # Hiện thông báo ngắn trên trang và tự ẩn sau 4500 mili giây.
function thongBao(noiDung, laLoi) {
  clearTimeout(henThongBao);
  var hop = lay('thong-bao');
  hop.textContent = noiDung;
  hop.className = laLoi ? 'toast error' : 'toast';
  hop.hidden = false;
  henThongBao = setTimeout(function () { hop.hidden = true; }, 4500);
}

// Chỉ quay lại các trang cục bộ trong dự án sau khi đăng nhập.
// # Kiểm tra phiên đăng nhập; nếu chưa có thì nhớ trang hiện tại và mở Đăng nhập.
function canDangNhap() {
  if (nguoiDangNhap()) { return true; }
  var trangQuayLai = location.pathname.split('/').pop() || 'index.html';
  if (!trangQuayLai.endsWith('.html')) { trangQuayLai += '.html'; }
  sessionStorage.setItem('kansou-quay-lai', trangQuayLai + location.search);
  location.href = 'dang-nhap.html';
  return false;
}

// # Đọc trang đã nhớ và quay lại sau đăng nhập; chỉ chấp nhận trang thuộc dự án.
function quayLaiSauDangNhap() {
  var trang = sessionStorage.getItem('kansou-quay-lai') || 'tai-khoan.html';
  sessionStorage.removeItem('kansou-quay-lai');
  if (!/^(index|danh-muc|chi-tiet|da-luu|review|tai-khoan)\.html(\?[^#]*)?$/.test(trang)) {
    trang = 'tai-khoan.html';
  }
  location.href = trang;
}

// FileReader và Canvas là phần bổ sung để tải, thu nhỏ poster hoặc avatar.
// # Đọc ảnh người dùng chọn, kiểm tra loại/kích thước rồi thu nhỏ bằng Canvas.
function docAnh(tep, xong) {
  if (!tep || !['image/jpeg', 'image/png', 'image/webp'].includes(tep.type)) {
    thongBao('Hãy chọn ảnh JPG, PNG hoặc WebP.', true); return;
  }
  if (tep.size > 5 * 1024 * 1024) { thongBao('Ảnh cần nhỏ hơn 5 MB.', true); return; }
  var doc = new FileReader();
  doc.onload = function () {
    var anh = new Image();
    anh.onload = function () {
      var tiLe = Math.min(700 / anh.width, 1000 / anh.height, 1);
      var canvas = document.createElement('canvas');
      canvas.width = Math.round(anh.width * tiLe);
      canvas.height = Math.round(anh.height * tiLe);
      canvas.getContext('2d').drawImage(anh, 0, 0, canvas.width, canvas.height);
      xong(canvas.toDataURL('image/jpeg', .8));
    };
    anh.onerror = function () { thongBao('Tệp ảnh không đọc được.', true); };
    anh.src = doc.result;
  };
  doc.onerror = function () { thongBao('Không đọc được tệp đã chọn.', true); };
  doc.readAsDataURL(tep);
}

// # Chọn nội dung Giới thiệu, Bảo mật hoặc Điều khoản để hiện trong hộp thoại.
function moThongTin(loai) {
  var tieuDe = 'Giới thiệu Kansou';
  var noiDung = 'Kansou là bài tập thiết kế web giúp tìm hiểu anime, viết review và lưu những bộ phim yêu thích. Thiết kế tham khảo từ Figma do người học cung cấp.';
  if (loai === 'bao-mat') {
    tieuDe = 'Chính sách bảo mật';
    noiDung = 'Bản bài tập lưu tài khoản, review, bình luận và danh sách đã lưu bằng localStorage trên trình duyệt. Không gửi dữ liệu đến máy chủ. Xóa dữ liệu trình duyệt sẽ xóa các thông tin này. Không dùng mật khẩu quan trọng.';
  }
  if (loai === 'dieu-khoan') {
    tieuDe = 'Điều khoản người dùng';
    noiDung = 'Nội dung đánh giá cần lịch sự và không chia sẻ thông tin riêng tư của người khác. Điểm và số liệu ban đầu là mẫu từ thiết kế. Poster thuộc các chủ sở hữu tác phẩm và được dùng trong bài tập học tập.';
  }
  lay('tieu-de-hop').textContent = tieuDe;
  lay('noi-dung-hop').textContent = noiDung;
  lay('hop-thong-tin').showModal();
}

/* Khởi tạo menu và tìm kiếm: các script có defer nên HTML đã sẵn sàng. */
// # Đọc tên trang đang mở từ URL để tô vàng mục menu tương ứng.
var trangHienTai = location.pathname.split('/').pop() || 'index.html';
// Hosting thường rút gọn /danh-muc.html thành /danh-muc.
// # Bổ sung .html khi hosting tự rút gọn địa chỉ trang.
if (!trangHienTai.endsWith('.html')) { trangHienTai += '.html'; }
var menuLinks = document.querySelectorAll('#menu a');
for (var i = 0; i < menuLinks.length; i++) {
  var link = menuLinks[i];
  if (link.getAttribute('href') === trangHienTai || (trangHienTai === 'chi-tiet.html' && i === 1)) {
    link.className = 'active'; link.setAttribute('aria-current', 'page');
  }
}
if (nguoiDangNhap()) { lay('link-tai-khoan').href = 'tai-khoan.html'; }

// # Bấm nút ba gạch trên điện thoại để mở hoặc đóng menu.
lay('nut-menu').onclick = function () {
  var mo = lay('menu').classList.toggle('open');
  this.setAttribute('aria-expanded', String(mo));
};
// # Bấm kính lúp để mở/đóng ô tìm kiếm; mở xong thì đặt con trỏ vào ô.
lay('nut-tim').onclick = function () {
  lay('tim-kiem').hidden = !lay('tim-kiem').hidden;
  this.setAttribute('aria-expanded', String(!lay('tim-kiem').hidden));
  if (!lay('tim-kiem').hidden) { lay('tu-khoa').focus(); }
};
// # Mỗi khi nhập chữ, tìm tối đa 5 anime gợi ý theo tên.
lay('tu-khoa').oninput = function () {
  var tuKhoa = boDau(this.value.trim());
  var html = '';
  var soKetQua = 0;
  var danhSach = tatCaAnime();
  for (var i = 0; i < danhSach.length; i++) {
    var anime = danhSach[i];
    if (tuKhoa && boDau(anime.title + ' ' + anime.nativeTitle).includes(tuKhoa) && soKetQua < 5) {
      html += '<a href="' + linkChiTiet(anime.id) + '"><img src="' + anToan(anime.poster) + '" alt=""><span>' + anToan(anime.title) + '</span></a>';
      soKetQua++;
    }
  }
  if (tuKhoa && soKetQua === 0) { html = '<p>Không có gợi ý. Bấm Tìm để tra cứu thêm.</p>'; }
  lay('goi-y-tim').innerHTML = html;
};
// # Nhấn Escape sẽ đóng tìm kiếm và menu điện thoại.
document.addEventListener('keydown', function (suKien) {
  if (suKien.key === 'Escape') {
    lay('tim-kiem').hidden = true;
    lay('menu').classList.remove('open');
    lay('nut-menu').setAttribute('aria-expanded', 'false');
    lay('nut-tim').setAttribute('aria-expanded', 'false');
  }
});
// # Nếu lúc đọc kho gặp lỗi, báo cho người xem thay vì bỏ qua.
if (loiKhoDuLieu) { thongBao(loiKhoDuLieu, true); }
