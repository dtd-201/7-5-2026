# =========================================
# DOCKERFILE - DÀNH CHO DEVELOPMENT
# =========================================
# File này mô tả cách Docker sẽ "đóng gói" ứng dụng React
# thành một container có thể chạy ở bất kỳ máy nào.
# =========================================

# --- BƯỚC 1: Chọn "hệ điều hành nền" (base image) ---
# Sử dụng Node.js phiên bản 20 (Alpine = bản nhỏ gọn, nhẹ hơn)

FROM node:20-alpine


# --- BƯỚC 2: Đặt thư mục làm việc bên trong container ---
WORKDIR /app


# --- BƯỚC 3: Copy file package.json vào trước ---
COPY package.json package-lock.json ./


# --- BƯỚC 4: Cài đặt các thư viện (dependencies) ---
RUN npm install


# --- BƯỚC 5: Copy toàn bộ source code vào container ---
COPY . .


# --    BƯỚC 6: KHAI BÁO CỔNG ỨNG DỤNG SẼ LẮNG NGHE (react mặc định là 3000, vite mặc định là 5173)
EXPOSE  5173


# --- BƯỚC 7: Lệnh khởi chạy khi container start ---
# "npm start" = chạy react-scripts start (development mode)
# "npm run dev" = chạy vite development server
# "npm run build" = build production
CMD ["npm", "run", "dev", "--", "--host"]

# --- BƯỚC 8: LỆNH BUILD DOCKER IMAGES: docker build -t name images . ---
# BƯỚC NÀY SẼ CHẠY LẦN LƯỢT CÁC CÂU LỆNH Ở TRÊN VÀ TẠO RA 1 IMAGES.


# --- BƯỚC 9: LỆNH CHẠY CONTAINER TỪ IMAGES ---
# NẾU LÀ VITE: docker run -d -p 5173:5173 --name react-container react-app
# NẾU LÀ REACT CRA: docker run -d -p 3000:3000 --name react-container react-app


# LỆNH XEM CONTAINER ĐANG CHẠY: docker ps
# LỆNH XEM TẤT CẢ CONTAINER: docker ps -a
# LỆNH STOP CONTAINER: docker stop name
# LỆNH XÓA container: docker rm name (Lưu ý nếu container đang chạy thì phải stop)
# LỆNH XÓA image: docker rmi name


