// อ้างอิงปุ่มและรายการเมนูสำหรับควบคุม navbar บนมือถือ
const hamburgerBtn = document.getElementById("hamburger-btn");
const navMenu = document.getElementById("nav-menu");

// ทำงานเฉพาะหน้าที่มีเมนูมือถือ เพื่อให้หน้าอื่นใช้งานสคริปต์ร่วมกันได้
if (hamburgerBtn && navMenu) {
  // เปิดหรือปิดเมนู พร้อมอัปเดตสถานะเพื่อการเข้าถึง
  hamburgerBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
    hamburgerBtn.setAttribute("aria-label", isOpen ? "ปิดเมนู" : "เปิดเมนู");
  });

  // ปิดเมนูเมื่อนักศึกษาเลือกลิงก์บนหน้าจอมือถือ
  navMenu.addEventListener("click", (event) => {
    if (event.target.closest("a") && window.innerWidth <= 700) {
      navMenu.classList.remove("active");
      hamburgerBtn.setAttribute("aria-expanded", "false");
      hamburgerBtn.setAttribute("aria-label", "เปิดเมนู");
    }
  });

  // กดปุ่ม Esc เพื่อปิดเมนูได้อย่างสะดวก
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navMenu.classList.remove("active");
      hamburgerBtn.setAttribute("aria-expanded", "false");
      hamburgerBtn.setAttribute("aria-label", "เปิดเมนู");
    }
  });
}

// แสดงรายละเอียดกำหนดการเมื่อผู้ใช้เลือกวันที่ในหน้าปฏิทิน
const eventDate = document.getElementById("event-date");
const eventTitle = document.getElementById("event-title");
const eventTime = document.getElementById("event-time");
const monthCalendars = document.getElementById("month-calendars");

if (monthCalendars && eventDate && eventTitle && eventTime) {
  const thaiMonths = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
  const calendarMonths = [
    [2026, 5], [2026, 6], [2026, 7], [2026, 8], [2026, 9], [2026, 10], [2027, 3],
  ];
  const events = {
    "2026-6-18": ["ลงทะเบียนปกติ (ออนไลน์)", "00:01 น."],
    "2026-6-23": ["วันสุดท้ายของการลงทะเบียนปกติ", "23:59 น."],
    "2026-6-29": ["วันเปิดภาคการศึกษา / เริ่มเพิ่ม–ลดรายวิชา", "08:30 น."],
    "2026-7-1": ["วันสุดท้ายของการเพิ่ม–ลด / เปลี่ยนกลุ่มรายวิชา", "23:59 น."],
    "2026-7-6": ["งดชำระเงินตามปกติ และเริ่มพิมพ์ใบแจ้งหนี้ผ่านเว็บ", "08:30 น."],
    "2026-7-12": ["วันสุดท้ายของการชำระเงินตามปกติ", "20:00 น."],
    "2026-7-31": ["วันสุดท้ายของการรักษาสภาพนักศึกษา", "16:30 น."],
    "2026-8-24": ["เริ่มช่วงวันสอบกลางภาค", "08:30 น."],
    "2026-8-30": ["วันสุดท้ายของช่วงสอบกลางภาค", "16:30 น."],
    "2026-10-18": ["วันสุดท้ายของการเรียนการสอน", "16:30 น."],
    "2026-10-19": ["เริ่มช่วงวันสอบปลายภาค", "08:30 น."],
    "2026-11-1": ["วันสุดท้ายของช่วงสอบปลายภาค", "16:30 น."],
    "2026-11-2": ["วันปิดภาคการศึกษา", "16:30 น."],
    "2026-11-10": ["วันประกาศผลการศึกษา", "16:30 น."],
    "2027-4-15": ["ลงทะเบียนปกติ ภาคการศึกษาถัดไป", "08:30 น."],
    "2027-4-19": ["วันเปิดภาคการศึกษา ภาคการศึกษาถัดไป", "08:00 น."],
  };

  let currentMonthIndex = 0;

  const renderMonth = () => {
    const [year, month] = calendarMonths[currentMonthIndex];
    const firstDay = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const blanks = Array.from({ length: firstDay }, () => "<span class=\"other-month\"></span>").join("");
    const dayItems = Array.from({ length: days }, (_, index) => {
      const day = index + 1;
      const key = `${year}-${month + 1}-${day}`;
      const event = events[key];
      return event
        ? `<button class="calendar-day has-event" type="button" data-date="${day} ${thaiMonths[month]} ${year + 543}" data-event="${event[0]}" data-time="${event[1]}">${day}</button>`
        : `<span>${day}</span>`;
    }).join("");
    monthCalendars.innerHTML = `<article class="month-calendar"><div class="month-title"><button class="calendar-nav" type="button" data-direction="previous" aria-label="เดือนก่อนหน้า" ${currentMonthIndex === 0 ? "disabled" : ""}>‹</button><h2>${thaiMonths[month]} ${year + 543}</h2><button class="calendar-nav" type="button" data-direction="next" aria-label="เดือนถัดไป" ${currentMonthIndex === calendarMonths.length - 1 ? "disabled" : ""}>›</button></div><div class="weekday-row" aria-hidden="true"><span>อา</span><span>จ</span><span>อ</span><span>พ</span><span>พฤ</span><span>ศ</span><span>ส</span></div><div class="day-grid" role="group" aria-label="${thaiMonths[month]} ${year + 543}">${blanks}${dayItems}</div></article>`;
  };

  renderMonth();

  monthCalendars.addEventListener("click", (event) => {
    const navigation = event.target.closest(".calendar-nav");
    if (navigation) {
      currentMonthIndex += navigation.dataset.direction === "next" ? 1 : -1;
      renderMonth();
      return;
    }
    const day = event.target.closest(".calendar-day");
    if (!day) return;
    document.querySelectorAll(".calendar-day").forEach((item) => item.classList.remove("is-selected"));
    day.classList.add("is-selected");
    eventDate.textContent = day.dataset.date;
    eventTitle.textContent = day.dataset.event;
    eventTime.textContent = `เวลา ${day.dataset.time}`;
  });
}
