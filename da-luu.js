// # BẢN HỌC MÃ KANSOU: dòng bắt đầu bằng // # là lời giải thích, không chạy như lệnh.
// # Đọc từng hàm: lấy dữ liệu -> xử lý -> cập nhật giao diện hoặc lưu vào trình duyệt.

/* ĐÃ LƯU: đọc danh sách của người đang đăng nhập và hiển thị. */
// # Lấy các id đã lưu của người hiện tại, tìm anime, lọc từ khóa và sắp xếp để hiển thị.
function hienDaLuu() {
  var nguoi = nguoiDangNhap();
  // # Nếu chưa đăng nhập, hiển thị hướng dẫn đăng nhập thay cho danh sách riêng.
  if (!nguoi) {
    lay('danh-sach-da-luu').innerHTML = vungTrong('Thư viện của riêng bạn', 'Đăng nhập để lưu và xem lại anime yêu thích.', 'dang-nhap.html', 'Đăng nhập');
    return;
  }
  // # Mảng kết quả chỉ chứa anime người hiện tại đã lưu và khớp ô tìm kiếm.
  var ketQua = [];
  for (var i = 0; i < nguoi.daLuu.length; i++) {
    var anime = timAnime(nguoi.daLuu[i]);
    if (anime && boDau(anime.title).includes(boDau(lay('tim-da-luu').value))) { ketQua.push(anime); }
  }
  // # Đọc lựa chọn sắp xếp trong ô select của trang Đã lưu.
  var cachXep = lay('sap-xep-da-luu').value;
  if (cachXep === 'az') { ketQua.sort(function (a, b) { return a.title.localeCompare(b.title); }); }
  if (cachXep === 'diem') { ketQua.sort(function (a, b) { return Number(layDiem(b)) - Number(layDiem(a)); }); }
  var html = '';
  for (var i = 0; i < ketQua.length; i++) {
    html += '<div class="saved-item">' + thePoster(ketQua[i]) + '<button class="remove-save" data-bo-luu="' + ketQua[i].id + '" aria-label="Bỏ lưu ' + anToan(ketQua[i].title) + '">♥</button></div>';
  }
  if (!html) {
    html = vungTrong('Chưa có anime phù hợp', 'Bấm Nhấn để lưu ở trang chi tiết, hoặc thử từ khóa khác.', 'danh-muc.html?tatca=1', 'Khám phá anime');
  }
  lay('danh-sach-da-luu').innerHTML = html;
}
// # Gõ tên đến đâu thì lọc lại danh sách đã lưu đến đó.
lay('tim-da-luu').oninput = hienDaLuu;
// # Đổi lựa chọn thì sắp xếp và hiển thị lại danh sách.
lay('sap-xep-da-luu').onchange = hienDaLuu;
// # Dùng một sự kiện cho cả danh sách; tìm nút tim qua thuộc tính data-bo-luu.
lay('danh-sach-da-luu').onclick = function (suKien) {
  var nut = suKien.target.closest('[data-bo-luu]');
  if (nut) {
    try { doiTrangThaiLuu(nut.dataset.boLuu); hienDaLuu(); } catch (loi) { thongBao(loi.message, true); }
  }
};
hienDaLuu();
