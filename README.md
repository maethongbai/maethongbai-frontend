# Maethongbai Classic

## แนะนำโปรเจคสั้น ๆ
โปรเจคนี้สร้างเป็น Web Application ของร้านทองแม่ทองใบ คลาสสิกซึ่งระบบจะมี 2 ส่วนใหญ่ๆ คือ

1. ส่วนที่ให้ลูกค้าสามารถมาซื้อทองออนไลน์ได้ โดยจะมีการเลือกซื้อและชำระเงินภายในระบบ

2. ส่วนจัดการระบบภายในร้าน ซึ่งจะแบ่งออกเป็น พนักงาน ฝ่ายบัญชี และผู้จัดการ (เจ้าของร้าน) 

โดยจะมีการลงรายละเอียดรายการต่างๆที่มีการให้บริการกับลูกค้าทางหน้าร้าน อย่างการขายทอง การรับซื้อทอง การรับทำงานสั่ง จากลูกค้าผ่านทางหน้าร้านซึ่งพนักงานจะทำการลงรายละเอียดการให้บริการเหล่านี้ลงระบบเวลามีลูกค้ามาใช้บริการ รวมถึงมีระบบที่จัดการระบบการขายออนไลน์ ซึ่งแต่ละฝ่านจะมีหน้าและสิทธิที่จะเข้าถึงข้อมูลต่างกัน

## ชื่อกลุ่ม และรายชื่อสมาชิกในกลุ่ม โดยระบุชื่อ นามสกุล รหัสนิสิต และ GitHub username

ชื่อกลุ่ม: Maethongbai

- 6310450662 รัชต์ธร ทรงศรีวิสุทธิ์ (ratchathorn)
- 6310450671 รินลดา ติระศิริชัย (opaller91)
- 6310451022 จิรัชญา พูลผล (ppinip)
- 6310451111 ณัฐพงศ์ ภูอุทา (bamnat)

โปรเจคนี้ ทํารวมกับวิชา 01418321 (System Analysis and Design)

## คำแนะนำในการติดตั้งโปรเจคสำหรับการพัฒนาด้วยคำสั่งของ docker-compose
```
docker-compose exec app npm install moment vue-horizontal@next @vuepic/vue-datepicker serve
docker-compose exec app npm run dev
```

## คำแนะนำในการติดตั้งโปรเจคสำหรับ deploy
```
docker-compose exec app npm run build
docker-compose exec app npm install serve
serve -s app/dist -l 9000
```

## คำแนะนำในการรันโปรเจคหรือการเข้าถึงหน้าเว็บไซต์
- development build: http://localhost:3000
- production build: http://localhost:9000

## default username และ password สำหรับผู้ใช้แต่ละ role
- user role:
    - phone: 0800000001
    - password: namkhing
- employee role:
    - phone: 0800000002
    - password: pinpinpin
- account role:
    - phone: 0800000004
    - password: bamboo
- manager role:
    - phone: 0800000005
    - password: amornamorn

## ระบุ release tag ของโปรเจคที่สมบูรณ์ ใช้ในการนำเสนอ
ยังไม่มี (สร้าง git tag -> กำหนด release) ในหน้า github
https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository

## ระบุ release tag ของโปรเจคที่แก้ไขหลังการนำเสนอ (หากมีการแก้ไข)
ยังไม่มี