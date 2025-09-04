# Sửa lỗi quyền truy cập trang Manage Profile

## Vấn đề

Khi vào trang `/users/:id/manage` và reload lại, người dùng nhận được thông báo "Không có quyền truy cập vào trang này".

## Nguyên nhân

1. **Route không được bảo vệ**: Route `/users/:id/manage` không được wrap bởi component xác thực nào
2. **Redux store bị reset**: Khi reload trang, Redux store bị reset về trạng thái ban đầu, `state.user.current.id` sẽ là chuỗi rỗng
3. **Thiếu logic kiểm tra quyền truy cập**: Không có cơ chế kiểm tra xem user có quyền truy cập profile của người khác hay không

## Giải pháp đã thực hiện

### 1. Bảo vệ route với LoggedUserRoute

- Wrap route `/users/:id/manage` trong `LoggedUserRoute` component
- Đảm bảo chỉ user đã đăng nhập mới có thể truy cập

### 2. Cải thiện LoggedUserRoute

- Thêm logic kiểm tra quyền truy cập profile
- User chỉ có thể truy cập profile của chính mình
- Redirect về trang chủ nếu cố gắng truy cập profile của người khác

### 3. Cải thiện Root component

- Thêm loading state trong khi kiểm tra authentication
- Xử lý tốt hơn việc khôi phục trạng thái user từ localStorage
- Chỉ redirect khi thực sự cần thiết

### 4. Thêm kiểm tra quyền truy cập trong ManageProfileView

- Kiểm tra xem user đã đăng nhập chưa
- Kiểm tra quyền truy cập profile
- Sửa lỗi TypeScript về type của email

## Các file đã thay đổi

1. **`src/presentation/routes/routes.tsx`**

   - Import `LoggedUserRoute`
   - Wrap route `/users/:id/manage` trong `LoggedUserRoute`

2. **`src/presentation/routes/LoggedUser.route.tsx`**

   - Thêm logic kiểm tra quyền truy cập profile
   - Sử dụng `useParams` để lấy ID từ URL

3. **`src/presentation/routes/Root.tsx`**

   - Thêm loading state
   - Cải thiện logic xử lý authentication
   - Thêm dependency array cho useEffect

4. **`src/presentation/views/manage-profile/ManageProfile.view.tsx`**
   - Thêm kiểm tra quyền truy cập
   - Sửa lỗi TypeScript về email type
   - Import `useParams` và `Navigate`

## Kết quả

- Trang `/users/:id/manage` giờ đây được bảo vệ đúng cách
- User chỉ có thể truy cập profile của chính mình
- Loading state được hiển thị trong khi kiểm tra authentication
- Không còn lỗi TypeScript
- Trải nghiệm người dùng được cải thiện

## Lưu ý

- Đảm bảo rằng `accessToken` và `accessTokenExpiry` được lưu trữ đúng cách trong localStorage
- Logic xác thực sẽ tự động redirect user về trang login nếu token không hợp lệ
- User sẽ được redirect về trang chủ nếu cố gắng truy cập profile của người khác

