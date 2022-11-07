<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="flex flex-col h-screen justify-between bg-[#F5F5F5]">
    <header class=" bg-white sticky top-0">
    <div class="inset-x-0 top-0 bg-[#F5F5F5]">
      <Navbar />
    </div>
    </header>

    <body class="bg-[#F5F5F5]">
      <RouterView />
    </body>

    <footer>
    <div class="bg-gradient-to-b from-[#D61111] via-[#9B0000] to-[#4E0000] h-[200px] items-center justify-center flex flex-row justify-center">
      <div class="w-[1200px]">
        <div class="flex flex-row justify-center grid grid-cols-3 text-center">
        <div>
          <div class="flex flex-col justify-center">
            <img alt="Maethongbai LOGO" class="mx-auto" src="@/assets/LOGO.png" width="228" height="84" />
            <p class="text-white mt-5">ห้างทองแม่ทองใบ คลาสสิก เดอะมอลล์บางแค<br>
                                        ซื้อ-ขาย ทองแท่ง ทองรูปพรรณ มาตรฐาน</p>
          </div>
        </div>

        <div class="mt-8">
          <div class="flex flex-col justify-center text-white text-left">
            <p class="text-bold text-xl"><b>ติดต่อเรา:</b></p>
            <p> <b>โทร: </b>02-4549398-9 <br>
                 <b>ที่ตั้ง: </b>275 หมู่ 1 ชั้น G เดอะมอลล์บางแค ถนนเพชรเกษม <br> แขวงบางแคเหนือ กรุงเทพมหานคร 10160 </p>
          </div>
        </div>

        <div class="mt-8">
          <div class="flex flex-col justify-center text-white text-left">
            <p class="text-bold text-xl"><b>ติดตามเรา:</b></p>
            <p> FB: ห้างทองแม่ทองใบ คลาสสิก เดอะมอลล์บางแค <br>
                Line id: mtcbangkae <br>
                Instagram: mtcbangkae <br>
            </p>
          </div>
        </div>

      </div>
      </div>
      
      
    </div>
  </footer>

  </div>
  
</template>
