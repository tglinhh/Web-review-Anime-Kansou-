// # BẢN HỌC MÃ KANSOU: dòng bắt đầu bằng // # là lời giải thích, không chạy như lệnh.
// # Đọc từng hàm: lấy dữ liệu -> xử lý -> cập nhật giao diện hoặc lưu vào trình duyệt.

/* LƯU TRỮ TRONG TRÌNH DUYỆT
   localStorage giữ dữ liệu sau khi đóng trang.
   JSON.stringify: đổi đối tượng thành chuỗi để lưu.
   JSON.parse: đổi chuỗi đã lưu thành đối tượng để đọc.
   Đây là đăng nhập minh họa cho bài tập, không phải tài khoản trên máy chủ. */

// # Tên khóa chứa toàn bộ dữ liệu Kansou trong localStorage của trình duyệt.
var TEN_KHO = 'kansou-sinhvien-v1';
var loiKhoDuLieu = '';

// # Đọc chuỗi từ localStorage và chuyển thành đối tượng bằng JSON.parse; chưa có thì tạo kho rỗng.
function docKho() {
  try {
    // # Lấy dữ liệu đã lưu bằng tên khóa TEN_KHO; chưa có dữ liệu thì kết quả là null.
    var chuoi = localStorage.getItem(TEN_KHO);
    if (chuoi) {
      // # Biến chuỗi JSON đã lưu thành đối tượng để đọc các mảng tài khoản, review...
      return JSON.parse(chuoi);
    }
  } catch (loi) {
    loiKhoDuLieu = 'Không đọc được dữ liệu trình duyệt. Hãy kiểm tra quyền lưu trữ.';
  }
  return { taiKhoan: [], phien: '', reviews: [], binhLuan: [], animeMoi: [] };
}

// # Đổi kho thành chuỗi bằng JSON.stringify rồi ghi vào localStorage.
function luuKho(kho) {
  if (loiKhoDuLieu) {
    throw new Error(loiKhoDuLieu);
  }
  try {
    // # Ghi chuỗi JSON xuống trình duyệt; dữ liệu giữ lại sau khi đóng và mở trang.
    localStorage.setItem(TEN_KHO, JSON.stringify(kho));
  } catch (loi) {
    throw new Error('Bộ nhớ trình duyệt đầy hoặc bị chặn. Hãy dùng ảnh nhỏ hơn.');
  }
}

// # Tạo một mã ngẫu nhiên cho tài khoản, review hoặc bình luận.
function taoMa() {
  return crypto.randomUUID();
}

// # Tìm tài khoản có id khớp với kho.phien; không đăng nhập thì trả null.
function nguoiDangNhap() {
  var kho = docKho();
  for (var i = 0; i < kho.taiKhoan.length; i++) {
    if (kho.taiKhoan[i].id === kho.phien) {
      return kho.taiKhoan[i];
    }
  }
  return null;
}

// # Tìm người dùng theo id, thay thông tin mới rồi lưu lại kho.
function capNhatNguoiDung(nguoi) {
  var kho = docKho();
  for (var i = 0; i < kho.taiKhoan.length; i++) {
    if (kho.taiKhoan[i].id === nguoi.id) {
      kho.taiKhoan[i] = nguoi;
    }
  }
  luuKho(kho);
}

/* Phần bổ sung ngoài giáo trình: Web Crypto băm mật khẩu.
   Mỗi tài khoản có một chuỗi muối riêng, không lưu mật khẩu gốc.
   Băm SHA-256 này chỉ phục vụ bản minh họa chạy cục bộ. */
// # Dùng Web Crypto tạo chuỗi băm từ muối và mật khẩu; không ghi mật khẩu gốc vào kho.
async function bamMatKhau(matKhau, muoi) {
  // # Ghép muối riêng với mật khẩu rồi chuyển chữ thành dữ liệu byte.
  var duLieu = new TextEncoder().encode(muoi + matKhau);
  // # Chờ trình duyệt tính băm SHA-256; đây là phần bổ sung ngoài HTML/CSS cơ bản.
  var ketQua = await crypto.subtle.digest('SHA-256', duLieu);
  var cacSo = new Uint8Array(ketQua);
  var chuoi = '';
  for (var i = 0; i < cacSo.length; i++) {
    chuoi += cacSo[i].toString(16).padStart(2, '0');
  }
  return chuoi;
}

// # Kiểm tra tên dài 3–30 ký tự và email có dạng hợp lệ; sai thì báo lỗi.
function kiemTraHoSo(ten, email) {
  if (ten.trim().length < 3 || ten.trim().length > 30) {
    throw new Error('Tên đăng nhập cần từ 3 đến 30 ký tự.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Vui lòng nhập email hợp lệ.');
  }
}

// # Không cho trùng tên/email với tài khoản khác; boQuaId dùng khi sửa chính hồ sơ mình.
function kiemTraTrung(ten, email, boQuaId) {
  var danhSach = docKho().taiKhoan;
  for (var i = 0; i < danhSach.length; i++) {
    var nguoi = danhSach[i];
    if (nguoi.id !== boQuaId && (nguoi.ten.toLowerCase() === ten.toLowerCase() || nguoi.email === email.toLowerCase())) {
      throw new Error('Tên đăng nhập hoặc email đã được sử dụng.');
    }
  }
}

// # Trả true nếu animeId đã nằm trong danh sách đã lưu của người hiện tại.
function daLuu(animeId) {
  var nguoi = nguoiDangNhap();
  return nguoi !== null && nguoi.daLuu.indexOf(animeId) !== -1;
}

// # Chưa lưu thì thêm id vào đầu danh sách; đã lưu thì xóa id, sau đó ghi kho.
function doiTrangThaiLuu(animeId) {
  if (!canDangNhap()) { return; }
  var nguoi = nguoiDangNhap();
  var viTri = nguoi.daLuu.indexOf(animeId);
  if (viTri === -1) {
    // # Thêm id anime vào đầu mảng để anime vừa lưu xuất hiện trước.
    nguoi.daLuu.unshift(animeId);
  } else {
    // # Xóa đúng 1 id tại vị trí tìm được khi người dùng bỏ lưu.
    nguoi.daLuu.splice(viTri, 1);
  }
  capNhatNguoiDung(nguoi);
  thongBao(viTri === -1 ? 'Đã lưu anime vào danh sách.' : 'Đã bỏ lưu anime.');
}
