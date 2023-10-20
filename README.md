## 專案簡介
foodmap幫助忙碌的現代人，快速搜尋附近的美食餐廳以及查看餐廳的詳細資訊

## 網站
- https://foodmap-pages.vercel.app/

## 如何操作
- 請允許網站存取您的位置
- 在輸入框輸入關鍵字(例：壽司)或參考輸入框下方出現建議地點選擇後執行搜尋，亦可點擊過濾器進行搜尋條件調整
- 點擊餐廳卡片可查看餐廳詳細資訊(電話、地址、距離、評論...等)
- 點擊地圖上的餐廳標記亦可查看詳細資訊(螢幕尺寸為平板以上)
- 點擊地圖上的餐廳標記對應的餐廳卡片移至螢幕中央(螢幕尺寸為平板以下)

## 預覽
![image](https://github.com/zebrrrra/food-map-pages/blob/main/public/readme/diagram.png)

## 環境設置
- node: 16.14.0
- next: 13.5.4
- react: ^18
- tailwindcss: "^3"

補充：此專案是[food-map](https://github.com/zebrrrra/food-map) (app router) 改為使用 pages router，因為deploying[Unsupported Features](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#unsupported-features)
