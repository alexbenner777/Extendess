import { useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, X } from "lucide-react";
import { SplitText, FadeIn, Marquee } from "@/components/ui-extras/animations";
import { Link } from "wouter";

type PriceItem = {
  name: string;
  price: string;
  note?: string;
  isHeader?: boolean;
};

type PriceCategory = {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  items: PriceItem[];
};

const priceCategories: PriceCategory[] = [
  {
    id: "makeup",
    num: "01",
    title: "Макияж · Брови · Ресницы",
    subtitle: "Визаж и коррекция",
    items: [
      { name: "МАКИЯЖ", price: "", isHeader: true },
      { name: "Express-макияж", price: "7 200 ₽", note: "60 мин" },
      { name: "Макияж Dessange Business", price: "7 900 ₽", note: "60 мин" },
      { name: "Макияж Lifting · Smokey · Cat's · Party · Actrisse · Вечерний", price: "11 300 ₽", note: "75 мин" },
      { name: "Wedding-fashion (макияж невесты)", price: "19 200 ₽", note: "90 мин" },
      { name: "«Камуфляж» (скрытие дефектов + макияж)", price: "19 200 ₽", note: "75 мин" },
      { name: "Studio (для фотосъёмки)", price: "22 400 ₽", note: "90 мин" },
      { name: "БРОВИ", price: "", isHeader: true },
      { name: "Коррекция бровей", price: "2 200 ₽", note: "20 мин" },
      { name: "Форма бровей", price: "4 000 ₽", note: "30 мин" },
      { name: "Форма бровей (мужчины)", price: "4 600 ₽", note: "30 мин" },
      { name: "Окраска бровей", price: "3 500 ₽", note: "20 мин" },
      { name: "Окрашивание бровей хной", price: "4 200 ₽", note: "30 мин" },
      { name: "Ламинирование бровей/ресниц", price: "11 400 ₽", note: "60 мин" },
      { name: "Микроблейдинг бровей", price: "30 400 ₽", note: "120 мин" },
      { name: "Микроблейдинг бровей (коррекция)", price: "25 300 ₽", note: "90 мин" },
      { name: "Татуаж бровей/губ (все техники)", price: "31 600 ₽", note: "120 мин" },
      { name: "Татуаж бровей/губ (коррекция)", price: "27 800 ₽", note: "90 мин" },
      { name: "Татуаж стрелки", price: "22 800 ₽", note: "90 мин" },
      { name: "Татуаж межресничного пространства", price: "21 500 ₽", note: "60 мин" },
      { name: "РЕСНИЦЫ", price: "", isHeader: true },
      { name: "Окраска ресниц", price: "3 500 ₽", note: "20 мин" },
      { name: "Ботокс для ресниц", price: "11 400 ₽", note: "45 мин" },
      { name: "Химическая завивка ресниц", price: "7 600 ₽", note: "60 мин" },
      { name: "Перманентная тушь", price: "11 400 ₽", note: "60 мин" },
      { name: "Наращивание ресниц пореснично (полностью)", price: "16 300 ₽", note: "90 мин" },
      { name: "Наращивание ресниц пореснично (частично)", price: "11 400 ₽", note: "60 мин" },
      { name: "Наращивание ресниц пучковое (полностью)", price: "5 700 ₽", note: "60 мин" },
      { name: "Наращивание ресниц пучковое (частично)", price: "3 800 ₽", note: "45 мин" },
    ],
  },
  {
    id: "hair",
    num: "02",
    title: "Парикмахерский зал",
    subtitle: "Стрижки · Укладки · Уходы",
    items: [
      { name: "УСЛУГИ ДЛЯ ЖЕНЩИН · БАЗОВЫЙ МАСТЕР", price: "", isHeader: true },
      { name: "Укладка", price: "3 600 — 3 900 ₽", note: "60 мин" },
      { name: "Укладка Коктейльная", price: "3 700 — 4 600 ₽", note: "75 мин" },
      { name: "Укладка De Luxe", price: "4 900 — 5 800 ₽", note: "90 мин" },
      { name: "Ультракороткая стрижка (до 3 см)", price: "4 700 ₽" },
      { name: "Стрижка с укладкой", price: "5 200 — 6 100 ₽", note: "60 мин" },
      { name: "Стрижка с укладкой Коктейльная", price: "6 800 — 8 100 ₽", note: "90 мин" },
      { name: "Стрижка с укладкой De Luxe", price: "9 000 — 10 600 ₽", note: "120 мин" },
      { name: "Стрижка чёлки", price: "1 500 ₽", note: "30 мин" },
      { name: "УСЛУГИ ДЛЯ ЖЕНЩИН · ПРОДВИНУТЫЙ МАСТЕР", price: "", isHeader: true },
      { name: "Укладка", price: "4 900 — 6 200 ₽", note: "60 мин" },
      { name: "Укладка Коктейльная", price: "6 200 — 8 400 ₽", note: "75 мин" },
      { name: "Укладка De Luxe", price: "9 000 — 11 800 ₽", note: "90 мин" },
      { name: "Ультракороткая стрижка (до 3 см)", price: "6 100 ₽" },
      { name: "Стрижка с укладкой", price: "9 000 — 11 700 ₽", note: "60 мин" },
      { name: "Стрижка с укладкой Коктейльная", price: "11 800 — 16 100 ₽", note: "90 мин" },
      { name: "Стрижка с укладкой De Luxe", price: "14 700 — 19 700 ₽", note: "120 мин" },
      { name: "Стрижка чёлки", price: "1 700 ₽", note: "30 мин" },
      { name: "УСЛУГИ ДЛЯ ЖЕНЩИН · ЭКСПЕРТ", price: "", isHeader: true },
      { name: "Укладка", price: "6 000 — 7 600 ₽", note: "60 мин" },
      { name: "Укладка Коктейльная", price: "7 600 — 10 400 ₽", note: "75 мин" },
      { name: "Укладка De Luxe", price: "11 500 — 14 700 ₽", note: "90 мин" },
      { name: "Ультракороткая стрижка (до 3 см)", price: "7 500 ₽" },
      { name: "Стрижка с укладкой", price: "11 500 — 14 800 ₽", note: "60 мин" },
      { name: "Стрижка с укладкой Коктейльная", price: "14 700 — 20 000 ₽", note: "90 мин" },
      { name: "Стрижка с укладкой De Luxe", price: "18 500 — 24 400 ₽", note: "120 мин" },
      { name: "Стрижка чёлки", price: "2 000 ₽", note: "30 мин" },
      { name: "УСЛУГИ ДЛЯ ЖЕНЩИН · ТОП", price: "", isHeader: true },
      { name: "Укладка", price: "6 800 — 9 000 ₽", note: "60 мин" },
      { name: "Укладка Коктейльная", price: "9 000 — 11 800 ₽", note: "75 мин" },
      { name: "Укладка De Luxe", price: "13 800 — 17 600 ₽", note: "90 мин" },
      { name: "Ультракороткая стрижка (до 3 см)", price: "8 900 ₽" },
      { name: "Стрижка с укладкой", price: "13 900 — 17 700 ₽", note: "60 мин" },
      { name: "Стрижка с укладкой Коктейльная", price: "17 600 — 23 100 ₽", note: "90 мин" },
      { name: "Стрижка с укладкой De Luxe", price: "22 500 — 29 100 ₽", note: "120 мин" },
      { name: "Стрижка чёлки", price: "2 100 ₽", note: "30 мин" },
      { name: "ТОП-МАСТЕР · КУПРЯШКИН АНДРЕЙ", price: "", isHeader: true },
      { name: "Укладка", price: "9 000 — 11 300 ₽", note: "60 мин" },
      { name: "Укладка Коктейльная", price: "11 300 — 14 100 ₽", note: "75 мин" },
      { name: "Укладка De Luxe", price: "16 100 — 19 800 ₽", note: "90 мин" },
      { name: "Ультракороткая стрижка (до 3 см)", price: "8 900 ₽", note: "90 мин" },
      { name: "Стрижка с укладкой", price: "22 500 — 28 500 ₽", note: "60 мин" },
      { name: "Стрижка с укладкой Коктейльная", price: "24 800 — 31 400 ₽", note: "90 мин" },
      { name: "Стрижка с укладкой De Luxe", price: "29 400 — 37 000 ₽", note: "120 мин" },
      { name: "Стрижка чёлки", price: "2 100 ₽", note: "30 мин" },
      { name: "УСЛУГИ ДЛЯ МУЖЧИН · БАЗОВЫЙ МАСТЕР", price: "", isHeader: true },
      { name: "Укладка", price: "2 800 — 3 600 ₽", note: "30 мин" },
      { name: "Стрижка с укладкой", price: "4 500 — 5 200 ₽", note: "60 мин" },
      { name: "Бритьё", price: "2 800 ₽", note: "30 мин" },
      { name: "Моделирование бороды/усов", price: "2 000 ₽", note: "30 мин" },
      { name: "Ультракороткая стрижка", price: "2 900 ₽", note: "30 мин" },
      { name: "УСЛУГИ ДЛЯ МУЖЧИН · ПРОДВИНУТЫЙ МАСТЕР", price: "", isHeader: true },
      { name: "Укладка", price: "3 700 — 4 600 ₽", note: "30 мин" },
      { name: "Стрижка с укладкой", price: "8 100 — 9 800 ₽", note: "60 мин" },
      { name: "Стрижка «бросс» с укладкой", price: "9 800 ₽", note: "60 мин" },
      { name: "Бритьё", price: "3 600 ₽", note: "30 мин" },
      { name: "Моделирование бороды/усов", price: "2 800 ₽", note: "30 мин" },
      { name: "Ультракороткая стрижка", price: "3 700 ₽", note: "30 мин" },
      { name: "УСЛУГИ ДЛЯ МУЖЧИН · ЭКСПЕРТ", price: "", isHeader: true },
      { name: "Укладка", price: "4 500 — 5 500 ₽", note: "30 мин" },
      { name: "Стрижка с укладкой", price: "9 900 — 11 500 ₽", note: "60 мин" },
      { name: "Стрижка «бросс» с укладкой", price: "11 500 ₽", note: "60 мин" },
      { name: "Бритьё", price: "4 000 ₽", note: "30 мин" },
      { name: "Моделирование бороды/усов", price: "3 600 ₽", note: "30 мин" },
      { name: "Ультракороткая стрижка", price: "4 600 ₽", note: "30 мин" },
      { name: "УСЛУГИ ДЛЯ МУЖЧИН · ТОП", price: "", isHeader: true },
      { name: "Укладка", price: "5 100 — 6 400 ₽", note: "30 мин" },
      { name: "Стрижка с укладкой", price: "11 400 — 13 600 ₽", note: "60 мин" },
      { name: "Стрижка «бросс» с укладкой", price: "13 600 ₽", note: "60 мин" },
      { name: "Бритьё", price: "4 700 ₽", note: "30 мин" },
      { name: "Моделирование бороды/усов", price: "4 000 ₽", note: "30 мин" },
      { name: "Ультракороткая стрижка", price: "5 500 ₽", note: "30 мин" },
      { name: "УСЛУГИ ДЛЯ ДЕТЕЙ", price: "", isHeader: true },
      { name: "Укладка", price: "3 600 — 4 500 ₽", note: "45 мин" },
      { name: "Стрижка с укладкой", price: "6 200 — 7 900 ₽", note: "60 мин" },
      { name: "Укладка De Luxe", price: "7 900 ₽", note: "90 мин" },
      { name: "УСЛУГИ АССИСТЕНТА", price: "", isHeader: true },
      { name: "Окрашивание", price: "5 500 — 7 200 ₽" },
      { name: "Стрижка с укладкой", price: "2 500 — 2 600 ₽" },
      { name: "Укладка", price: "2 100 — 2 500 ₽" },
      { name: "Стрижка для мужчин", price: "1 600 ₽" },
      { name: "Химическая завивка", price: "4 500 — 6 400 ₽" },
    ],
  },
  {
    id: "color",
    num: "03",
    title: "Колористические услуги",
    subtitle: "Мелирование · Окрашивание · Завивка",
    items: [
      { name: "МЕЛИРОВАНИЕ · БАЗОВЫЙ МАСТЕР", price: "", isHeader: true },
      { name: "Флэш (выделение нескольких прядей)", price: "4 100 — 4 600 ₽", note: "60 мин" },
      { name: "Санлайт (солнечный эффект)", price: "5 500 — 6 600 ₽", note: "90 мин" },
      { name: "Гласаж (сияние и блеск)", price: "5 500 — 6 600 ₽", note: "90 мин" },
      { name: "Техно (техника крепаж)", price: "8 100 — 9 800 ₽", note: "120 мин" },
      { name: "Великая классика (равномерный эффект)", price: "8 100 — 9 800 ₽", note: "120 мин" },
      { name: "Калифорнийское мелирование", price: "8 100 — 9 800 ₽", note: "120 мин" },
      { name: "Цвет и свет (абсолютный контраст)", price: "8 100 — 9 800 ₽", note: "120 мин" },
      { name: "МЕЛИРОВАНИЕ · ПРОДВИНУТЫЙ МАСТЕР", price: "", isHeader: true },
      { name: "Флэш", price: "5 500 — 6 700 ₽", note: "60 мин" },
      { name: "Санлайт", price: "7 800 — 9 800 ₽", note: "90 мин" },
      { name: "Гласаж", price: "7 800 — 9 800 ₽", note: "90 мин" },
      { name: "Техно", price: "12 900 — 15 900 ₽", note: "120 мин" },
      { name: "Великая классика", price: "12 900 — 15 900 ₽", note: "120 мин" },
      { name: "Калифорнийское мелирование", price: "12 900 — 15 900 ₽", note: "120 мин" },
      { name: "МЕЛИРОВАНИЕ · ЭКСПЕРТ", price: "", isHeader: true },
      { name: "Флэш", price: "6 700 — 8 300 ₽", note: "60 мин" },
      { name: "Санлайт", price: "9 800 — 12 700 ₽", note: "90 мин" },
      { name: "Гласаж", price: "9 800 — 12 700 ₽", note: "90 мин" },
      { name: "Техно", price: "15 600 — 20 000 ₽", note: "120 мин" },
      { name: "Калифорнийское мелирование", price: "15 600 — 20 000 ₽", note: "120 мин" },
      { name: "МЕЛИРОВАНИЕ · ТОП", price: "", isHeader: true },
      { name: "Флэш", price: "7 700 — 9 700 ₽", note: "60 мин" },
      { name: "Санлайт", price: "11 500 — 14 400 ₽", note: "90 мин" },
      { name: "Гласаж", price: "11 500 — 14 400 ₽", note: "90 мин" },
      { name: "Техно", price: "18 400 — 22 800 ₽", note: "120 мин" },
      { name: "Калифорнийское мелирование", price: "18 400 — 22 800 ₽", note: "120 мин" },
      { name: "ОКРАШИВАНИЕ · БАЗОВЫЙ МАСТЕР", price: "", isHeader: true },
      { name: "Комфорт (стойкое без аммиака)", price: "7 700 — 9 500 ₽", note: "90 мин" },
      { name: "Материя (яркий цвет)", price: "7 700 — 9 500 ₽", note: "90 мин" },
      { name: "Обесцвечивание Dessange (экстремальный блонд)", price: "7 700 — 9 500 ₽", note: "90 мин" },
      { name: "Тонирование (естественный оттенок)", price: "6 100 — 7 400 ₽", note: "60 мин" },
      { name: "Сияющая эмульсия (сияние натурального цвета)", price: "6 100 — 7 400 ₽", note: "60 мин" },
      { name: "Коррекция цвета / предварительное окрашивание", price: "3 700 — 4 900 ₽", note: "30 мин" },
      { name: "Снятие цвета", price: "7 400 — 9 200 ₽" },
      { name: "ОКРАШИВАНИЕ · ПРОДВИНУТЫЙ МАСТЕР", price: "", isHeader: true },
      { name: "Комфорт (стойкое без аммиака)", price: "10 600 — 13 300 ₽", note: "90 мин" },
      { name: "Тонирование", price: "6 700 — 8 100 ₽", note: "60 мин" },
      { name: "Снятие цвета", price: "10 200 — 12 900 ₽" },
      { name: "ОКРАШИВАНИЕ · ЭКСПЕРТ", price: "", isHeader: true },
      { name: "Комфорт (стойкое без аммиака)", price: "12 900 — 16 200 ₽", note: "90 мин" },
      { name: "Тонирование", price: "8 400 — 9 800 ₽", note: "60 мин" },
      { name: "Снятие цвета", price: "12 500 — 15 500 ₽" },
      { name: "ОКРАШИВАНИЕ · ТОП", price: "", isHeader: true },
      { name: "Комфорт (стойкое без аммиака)", price: "15 100 — 18 900 ₽", note: "90 мин" },
      { name: "Тонирование", price: "10 000 — 12 200 ₽", note: "60 мин" },
      { name: "Снятие цвета", price: "14 700 — 17 900 ₽" },
      { name: "ХИМИЧЕСКАЯ ЗАВИВКА · БАЗОВЫЙ МАСТЕР", price: "", isHeader: true },
      { name: "Magic", price: "8 300 — 10 800 ₽", note: "120 мин" },
      { name: "Gold", price: "10 600 — 13 800 ₽", note: "120 мин" },
      { name: "Royal", price: "26 100 — 32 400 ₽", note: "180 мин" },
      { name: "ХИМИЧЕСКАЯ ЗАВИВКА · ПРОДВИНУТЫЙ МАСТЕР", price: "", isHeader: true },
      { name: "Magic", price: "11 400 — 13 900 ₽", note: "120 мин" },
      { name: "Gold", price: "15 500 — 19 100 ₽", note: "120 мин" },
      { name: "Royal", price: "26 100 — 32 400 ₽", note: "180 мин" },
      { name: "ХИМИЧЕСКАЯ ЗАВИВКА · ЭКСПЕРТ", price: "", isHeader: true },
      { name: "Magic", price: "13 700 — 17 500 ₽", note: "120 мин" },
      { name: "Gold", price: "18 400 — 22 500 ₽", note: "120 мин" },
      { name: "Royal", price: "26 100 — 32 400 ₽", note: "180 мин" },
      { name: "ХИМИЧЕСКАЯ ЗАВИВКА · ТОП", price: "", isHeader: true },
      { name: "Magic", price: "16 100 — 20 000 ₽", note: "120 мин" },
      { name: "Gold", price: "21 000 — 26 100 ₽", note: "120 мин" },
      { name: "Royal", price: "26 100 — 32 400 ₽", note: "180 мин" },
    ],
  },
  {
    id: "haircare",
    num: "04",
    title: "Уходы для волос · Наращивание",
    subtitle: "Восстановление и объём",
    items: [
      { name: "L'ORÉAL PROFESSIONNEL", price: "", isHeader: true },
      { name: "Уход L'Oréal Smartbond", price: "3 300 — 5 200 ₽" },
      { name: "SISLEY", price: "", isHeader: true },
      { name: "Экспресс-уход", price: "3 000 — 4 600 ₽" },
      { name: "K-18", price: "", isHeader: true },
      { name: "Уход К-18", price: "3 800 — 5 200 ₽" },
      { name: "ADORN", price: "", isHeader: true },
      { name: "Коллагеновое лечение", price: "12 500 — 19 100 ₽" },
      { name: "NASHI", price: "", isHeader: true },
      { name: "Filler Therapy долговременный", price: "5 200 — 8 100 ₽" },
      { name: "Экспресс-уход с лифтинг-эффектом Filler Service", price: "3 800 — 6 700 ₽" },
      { name: "IE LUMISS", price: "", isHeader: true },
      { name: "Экспресс-уход", price: "4 000 — 4 800 ₽" },
      { name: "Глубокое молекулярное восстановление", price: "7 700 — 11 400 ₽" },
      { name: "LABEL", price: "", isHeader: true },
      { name: "Счастье для волос", price: "8 400 — 11 600 ₽" },
      { name: "Жизненная сила", price: "5 800 — 7 900 ₽" },
      { name: "Сияние цвета", price: "5 800 — 7 900 ₽" },
      { name: "Био-ламинирование (окрашивание гелем/кремом)", price: "11 400 — 15 400 ₽" },
      { name: "Долговременный уход «Абсолютное счастье»", price: "11 600 — 14 100 ₽" },
      { name: "GREYMY · КЕРАТИНОВОЕ ВОССТАНОВЛЕНИЕ", price: "", isHeader: true },
      { name: "Gold Deluxe Keratin (с частицами золота)", price: "23 200 — 37 200 ₽" },
      { name: "Keratin Treatment (разглаживающая терапия)", price: "10 800 — 19 100 ₽" },
      { name: "Express Keratin (долговременная SPA-укладка)", price: "10 000 — 19 200 ₽" },
      { name: "SPA-keratin (глубокая реставрация)", price: "5 800 — 9 100 ₽" },
      { name: "Супер Комплекс (аминокислотное восстановление)", price: "5 200 — 8 000 ₽" },
      { name: "Luxury Shine (бриллиантовое сияние)", price: "3 100 — 5 800 ₽" },
      { name: "ELIOKAP · УХОДЫ", price: "", isHeader: true },
      { name: "БИО уход (женщины)", price: "3 900 — 5 300 ₽" },
      { name: "БИО уход (мужчины)", price: "3 200 ₽" },
      { name: "БИО уход окрашивание", price: "4 100 — 6 100 ₽" },
      { name: "Лечение от выпадения", price: "7 600 ₽" },
      { name: "Андрогенное выпадение", price: "8 500 ₽" },
      { name: "Экспресс-уход (кожа головы)", price: "5 500 — 6 300 ₽" },
      { name: "Увлажнение (структура волоса)", price: "8 500 — 9 200 ₽" },
      { name: "НАРАЩИВАНИЕ ВОЛОС", price: "", isHeader: true },
      { name: "Наращивание одной пряди", price: "1 100 ₽", note: "15 мин" },
      { name: "Снятие одной пряди", price: "900 ₽", note: "15 мин" },
      { name: "Трессы 40 см — 1 шт.", price: "8 600 ₽" },
      { name: "Трессы 40 см — 6 шт.", price: "41 400 ₽" },
      { name: "Трессы 50 см — 1 шт.", price: "10 300 ₽" },
      { name: "Трессы 50 см — 6 шт.", price: "58 300 ₽" },
      { name: "Трессы 60 см — 1 шт.", price: "14 200 ₽" },
      { name: "Трессы 60 см — 6 шт.", price: "75 400 ₽" },
    ],
  },
  {
    id: "nails",
    num: "05",
    title: "Ногтевой сервис",
    subtitle: "Маникюр · Педикюр · Наращивание",
    items: [
      { name: "МАНИКЮР · ЖЕНСКИЙ", price: "", isHeader: true },
      { name: "Маникюр (Классический, Французский, Японский, Аппаратный)", price: "4 100 ₽", note: "45 мин" },
      { name: "Экспресс-маникюр", price: "2 600 ₽", note: "30 мин" },
      { name: "Покрытие ногтей", price: "2 200 ₽", note: "20 мин" },
      { name: "Покрытие ногтей (френч, лунный)", price: "2 800 ₽", note: "25 мин" },
      { name: "Стойкое покрытие", price: "3 800 ₽", note: "30 мин" },
      { name: "Стойкое покрытие (френч, лунный)", price: "4 300 ₽", note: "35 мин" },
      { name: "Снятие стойкого покрытия", price: "1 500 ₽", note: "15 мин" },
      { name: "Укрепление ногтей (IBX, LCN)", price: "1 900 ₽", note: "20 мин" },
      { name: "Маникюр детский", price: "2 200 ₽", note: "30 мин" },
      { name: "ПЕДИКЮР · ЖЕНСКИЙ", price: "", isHeader: true },
      { name: "Педикюр (в т.ч. аппаратный)", price: "6 000 ₽", note: "60 мин" },
      { name: "Экспресс-педикюр", price: "4 100 ₽", note: "40 мин" },
      { name: "Покрытие ногтей", price: "2 400 ₽", note: "20 мин" },
      { name: "Стойкое покрытие", price: "4 200 ₽", note: "30 мин" },
      { name: "Стойкое покрытие (френч, лунный)", price: "4 700 ₽", note: "35 мин" },
      { name: "Снятие стойкого покрытия", price: "1 700 ₽", note: "15 мин" },
      { name: "МАНИКЮР · МУЖСКОЙ", price: "", isHeader: true },
      { name: "Маникюр (Классический, Аппаратный)", price: "5 100 ₽", note: "40 мин" },
      { name: "Полировка ногтей", price: "1 300 ₽", note: "15 мин" },
      { name: "Лечебное покрытие", price: "1 100 ₽", note: "15 мин" },
      { name: "ПЕДИКЮР · МУЖСКОЙ", price: "", isHeader: true },
      { name: "Педикюр", price: "6 600 ₽", note: "60 мин" },
      { name: "Полировка ногтей", price: "1 400 ₽", note: "15 мин" },
      { name: "НАРАЩИВАНИЕ НОГТЕЙ", price: "", isHeader: true },
      { name: "Наращивание ногтей (гель, акрил, биогель)", price: "10 000 ₽", note: "75 мин" },
      { name: "Наращивание ногтей (френч)", price: "11 300 ₽", note: "90 мин" },
      { name: "Коррекция ногтей", price: "7 900 ₽", note: "60 мин" },
      { name: "Коррекция ногтей (френч)", price: "10 000 ₽", note: "75 мин" },
      { name: "Снятие нарощенных ногтей", price: "3 200 ₽", note: "30 мин" },
      { name: "Укрепление ногтей биогелем", price: "8 000 ₽", note: "60 мин" },
      { name: "КОРРЕКЦИЯ И ПРОТЕЗИРОВАНИЕ", price: "", isHeader: true },
      { name: "Обработка натоптышей", price: "700 ₽", note: "15 мин" },
      { name: "Удаление/обработка мозолей (1 ед.)", price: "500 ₽", note: "10 мин" },
      { name: "Тампонада", price: "500 ₽", note: "10 мин" },
      { name: "Протезирование/коррекция сложного ногтя (1 ед.)", price: "2 000 ₽", note: "30 мин" },
      { name: "SPA-УХОДЫ", price: "", isHeader: true },
      { name: "SPA уход для рук", price: "3 000 ₽", note: "30 мин" },
      { name: "SPA уход для ног", price: "3 500 ₽", note: "30 мин" },
      { name: "Экспресс уход для рук", price: "1 500 ₽", note: "15 мин" },
      { name: "Экспресс уход для ног", price: "1 900 ₽", note: "15 мин" },
      { name: "Массаж рук", price: "1 100 ₽", note: "15 мин" },
      { name: "Массаж ног", price: "1 900 ₽", note: "15 мин" },
      { name: "SPA уход «Жемчужные ручки»", price: "4 400 ₽", note: "45 мин" },
      { name: "SPA уход «Жемчужные ножки»", price: "4 600 ₽", note: "45 мин" },
    ],
  },
  {
    id: "epilation",
    num: "06",
    title: "Эпиляция и депиляция",
    subtitle: "Лазерная · Фото · Восковая",
    items: [
      { name: "ДЕПИЛЯЦИЯ · ЖЕНЩИНЫ", price: "", isHeader: true },
      { name: "Депиляция над губой", price: "1 800 ₽", note: "15 мин" },
      { name: "Депиляция подбородка", price: "1 800 ₽", note: "15 мин" },
      { name: "Руки", price: "3 000 ₽", note: "30 мин" },
      { name: "Подмышки", price: "3 500 ₽", note: "20 мин" },
      { name: "Ноги выше / до колена", price: "3 500 ₽", note: "30 мин" },
      { name: "Бикини", price: "5 100 ₽", note: "30 мин" },
      { name: "Бикини глубокое", price: "8 800 ₽", note: "45 мин" },
      { name: "Бикини-дизайн", price: "9 500 ₽", note: "45 мин" },
      { name: "ДЕПИЛЯЦИЯ · МУЖЧИНЫ", price: "", isHeader: true },
      { name: "Депиляция над губой", price: "2 500 ₽", note: "15 мин" },
      { name: "Депиляция подбородка", price: "4 200 ₽", note: "20 мин" },
      { name: "Депиляция носа/скул/ушей", price: "2 100 ₽", note: "15 мин" },
      { name: "Шея", price: "4 200 ₽", note: "20 мин" },
      { name: "Руки до локтей", price: "3 000 ₽", note: "30 мин" },
      { name: "Подмышки", price: "3 600 ₽", note: "20 мин" },
      { name: "Грудной отдел / живот", price: "5 500 ₽", note: "30 мин" },
      { name: "Верх спины", price: "5 400 ₽", note: "25 мин" },
      { name: "Спина полностью", price: "8 600 ₽", note: "45 мин" },
      { name: "Бикини", price: "11 700 ₽", note: "30 мин" },
      { name: "VELURE 8800 · ЛАЗЕРНАЯ ЭПИЛЯЦИЯ", price: "", isHeader: true },
      { name: "Эпиляция верхней губы", price: "3 500 ₽", note: "15 мин" },
      { name: "Эпиляция лица", price: "12 000 ₽", note: "30 мин" },
      { name: "Эпиляция подбородка", price: "6 000 ₽", note: "20 мин" },
      { name: "Эпиляция груди", price: "14 000 ₽", note: "30 мин" },
      { name: "Эпиляция груди (мужчины)", price: "21 000 ₽", note: "40 мин" },
      { name: "Эпиляция живота", price: "14 000 ₽", note: "30 мин" },
      { name: "Эпиляция ног выше колена", price: "21 000 ₽", note: "40 мин" },
      { name: "Эпиляция ног до колена", price: "17 000 ₽", note: "30 мин" },
      { name: "Эпиляция подмышек", price: "9 000 ₽", note: "20 мин" },
      { name: "Эпиляция поясницы/ягодиц", price: "10 000 ₽", note: "30 мин" },
      { name: "Эпиляция рук (до локтя)", price: "12 000 ₽", note: "25 мин" },
      { name: "Эпиляция рук (полностью)", price: "20 000 ₽", note: "40 мин" },
      { name: "Эпиляция спины", price: "15 000 ₽", note: "40 мин" },
      { name: "Эпиляция шеи (мужчины)", price: "9 000 ₽", note: "20 мин" },
      { name: "Эпиляция «бразильское бикини»", price: "14 000 ₽", note: "40 мин" },
      { name: "Эпиляция бикини", price: "11 500 ₽", note: "30 мин" },
      { name: "QUANTUM · ФОТОЭПИЛЯЦИЯ", price: "", isHeader: true },
      { name: "Эпиляция верхней губы", price: "3 500 ₽", note: "15 мин" },
      { name: "Эпиляция лица", price: "12 000 ₽", note: "30 мин" },
      { name: "Эпиляция подбородка", price: "6 000 ₽", note: "20 мин" },
      { name: "Эпиляция груди", price: "13 500 ₽", note: "30 мин" },
      { name: "Эпиляция груди (мужчины)", price: "20 000 ₽", note: "40 мин" },
      { name: "Эпиляция живота", price: "13 500 ₽", note: "30 мин" },
      { name: "Эпиляция ног выше колена", price: "20 000 ₽", note: "40 мин" },
      { name: "Эпиляция ног до колена", price: "24 000 ₽", note: "35 мин" },
      { name: "Эпиляция подмышек", price: "9 000 ₽", note: "20 мин" },
      { name: "Эпиляция поясницы/ягодиц", price: "15 000 ₽", note: "30 мин" },
      { name: "Эпиляция рук (до локтя)", price: "12 000 ₽", note: "25 мин" },
      { name: "Эпиляция рук (полностью)", price: "19 000 ₽", note: "40 мин" },
      { name: "Эпиляция «бразильское бикини»", price: "15 000 ₽", note: "40 мин" },
      { name: "Эпиляция бикини", price: "11 500 ₽", note: "30 мин" },
    ],
  },
  {
    id: "cosmo",
    num: "07",
    title: "Аппаратная косметология",
    subtitle: "Уходы · Аппаратные процедуры · Консультации",
    items: [
      { name: "КОНСУЛЬТАЦИИ ВРАЧА", price: "", isHeader: true },
      { name: "Консультация врача по anti-age терапии", price: "6 000 ₽", note: "60 мин" },
      { name: "Консультация врача по косметологии", price: "6 000 ₽", note: "60 мин" },
      { name: "Консультация по коррекции фигуры", price: "6 000 ₽", note: "60 мин" },
      { name: "Консультация трихолога", price: "6 000 ₽", note: "60 мин" },
      { name: "Консультация нутрициолога", price: "6 000 ₽", note: "60 мин" },
      { name: "УХОДЫ ДЛЯ ЛИЦА", price: "", isHeader: true },
      { name: "Экспресс уход / Бьюти Ланч", price: "3 200 — 6 600 ₽", note: "30 мин" },
      { name: "Pre Party / Мгновенное восстановление", price: "4 200 — 7 800 ₽", note: "45 мин" },
      { name: "Постпилинговый уход", price: "8 500 — 10 900 ₽", note: "60 мин" },
      { name: "Уход Miracle", price: "9 700 — 14 500 ₽", note: "60 мин" },
      { name: "Релаксирующий лифтинг уход", price: "11 400 — 18 700 ₽", note: "75 мин" },
      { name: "Luxe SPA уход", price: "17 500 — 30 800 ₽", note: "90 мин" },
      { name: "De Luxe SPA уход", price: "23 500 — 42 900 ₽", note: "90 мин" },
      { name: "Уход за контуром глаз/губ", price: "2 400 — 4 200 ₽", note: "20 мин" },
      { name: "МАСКИ", price: "", isHeader: true },
      { name: "Маска (кремовая / альгинатная / тканевая)", price: "2 300 — 4 700 ₽", note: "20 мин" },
      { name: "Luxe маска", price: "5 300 — 7 700 ₽", note: "25 мин" },
      { name: "De Luxe маска", price: "11 300 — 18 000 ₽", note: "30 мин" },
      { name: "МАССАЖ ЛИЦА", price: "", isHeader: true },
      { name: "Массаж лица (20 мин)", price: "3 100 — 4 800 ₽", note: "20 мин" },
      { name: "Массаж лица (40 мин)", price: "5 300 — 7 700 ₽", note: "40 мин" },
      { name: "ПИЛИНГИ", price: "", isHeader: true },
      { name: "Пилинг лица", price: "3 600 — 12 700 ₽", note: "45 мин" },
      { name: "Пилинг шеи/декольте", price: "3 000 — 7 800 ₽", note: "30 мин" },
      { name: "Пилинг кистей рук", price: "2 800 — 4 300 ₽", note: "20 мин" },
      { name: "Пилинг спины", price: "6 600 — 10 900 ₽", note: "40 мин" },
      { name: "ЧИСТКИ ЛИЦА", price: "", isHeader: true },
      { name: "Атравматичная чистка", price: "7 700 — 11 300 ₽", note: "60 мин" },
      { name: "Механическая чистка (лицо полностью)", price: "5 300 ₽", note: "60 мин" },
      { name: "ПРЕССОТЕРАПИЯ", price: "", isHeader: true },
      { name: "Прессотерапия", price: "5 000 ₽", note: "30 мин" },
      { name: "Прессотерапия", price: "7 000 ₽", note: "45 мин" },
      { name: "Прессотерапия", price: "8 000 ₽", note: "60 мин" },
      { name: "CLEAR+BRILLIANT · ФРАКЦИОННЫЙ ЛАЗЕР", price: "", isHeader: true },
      { name: "Clear+Brilliant (зонально)", price: "25 000 ₽", note: "40 мин" },
      { name: "QUANTUM · ФОТООМОЛОЖЕНИЕ", price: "", isHeader: true },
      { name: "Лицо", price: "25 000 ₽", note: "60 мин" },
      { name: "Лоб", price: "10 000 ₽", note: "30 мин" },
      { name: "Щёки", price: "12 000 ₽", note: "30 мин" },
      { name: "Шея", price: "15 000 ₽", note: "30 мин" },
      { name: "Декольте", price: "20 000 ₽", note: "30 мин" },
      { name: "Лицо + шея", price: "34 000 ₽", note: "75 мин" },
      { name: "Лицо + шея + декольте", price: "51 000 ₽", note: "90 мин" },
      { name: "VELURE S5 · ЛАЗЕРНОЕ ОМОЛОЖЕНИЕ", price: "", isHeader: true },
      { name: "Лазерное омоложение лицо (неабляционное фракционное)", price: "15 000 ₽", note: "60 мин" },
      { name: "Лазерное омоложение, веки", price: "10 000 ₽", note: "30 мин" },
      { name: "Лазерное омоложение, шея", price: "15 000 ₽", note: "45 мин" },
      { name: "Лазерное омоложение, декольте", price: "15 000 ₽", note: "45 мин" },
      { name: "Лазерное омоложение, кисти рук", price: "10 000 ₽", note: "30 мин" },
      { name: "Лазерное омоложение, лицо + шея + декольте", price: "35 000 ₽", note: "90 мин" },
      { name: "Удаление сосудистой звёздочки (1 шт.)", price: "1 500 ₽", note: "10 мин" },
      { name: "Удаление папилломы (до 1 мм)", price: "1 500 ₽", note: "10 мин" },
      { name: "Удаление папилломы (2–4 мм)", price: "3 500 ₽", note: "15 мин" },
      { name: "Удаление папилломы (5–7 мм)", price: "5 000 ₽", note: "15 мин" },
      { name: "BIOREVITAL RF", price: "", isHeader: true },
      { name: "BIOREVITAL RF — лицо", price: "9 000 ₽", note: "60 мин" },
      { name: "BIOREVITAL RF — шея", price: "8 000 ₽", note: "30 мин" },
      { name: "BIOREVITAL RF — декольте", price: "8 000 ₽", note: "30 мин" },
      { name: "BIOREVITAL RF — лицо + шея", price: "12 500 ₽", note: "60 мин" },
      { name: "BIOREVITAL RF — глаза/веки", price: "7 000 ₽", note: "30 мин" },
      { name: "BIOREVITAL RF — живот", price: "9 500 ₽", note: "45 мин" },
      { name: "BIOREVITAL RF — галифе + внутренняя поверхность бёдер", price: "10 500 ₽", note: "60 мин" },
      { name: "BIOREVITAL RF — кисти рук", price: "8 000 ₽", note: "30 мин" },
      { name: "ICOONE · ЛАЗЕРНАЯ ТЕРАПИЯ", price: "", isHeader: true },
      { name: "ICOONE лицо (30 мин)", price: "5 500 ₽", note: "30 мин" },
      { name: "ICOONE лицо (45 мин)", price: "6 000 ₽", note: "45 мин" },
      { name: "ICOONE лицо (60 мин)", price: "9 500 ₽", note: "60 мин" },
      { name: "ICOONE тело (30 мин)", price: "6 900 ₽", note: "30 мин" },
      { name: "ICOONE тело (45 мин)", price: "8 000 ₽", note: "45 мин" },
      { name: "ICOONE тело (60 мин)", price: "10 500 ₽", note: "60 мин" },
      { name: "HELEO4 · ФОТОДИНАМИЧЕСКАЯ ТЕРАПИЯ", price: "", isHeader: true },
      { name: "Heleo4 (лицо + шея + декольте)", price: "15 000 ₽", note: "60 мин" },
      { name: "Heleo4 Маска Hydrogel (активатор)", price: "6 000 ₽", note: "30 мин" },
      { name: "FUTERA DOTS", price: "", isHeader: true },
      { name: "Летний пилинг лицо + шея", price: "30 000 ₽", note: "60 мин" },
      { name: "Лёгкая / средняя форма акне и постакне", price: "25 000 ₽", note: "60 мин" },
      { name: "Тяжёлая форма акне и постакне", price: "37 000 ₽", note: "60 мин" },
      { name: "RF омоложение — лицо", price: "25 000 ₽", note: "60 мин" },
      { name: "RF омоложение — лицо + шея", price: "37 000 ₽", note: "60 мин" },
      { name: "RF омоложение — лицо + шея + декольте", price: "60 000 ₽", note: "90 мин" },
      { name: "RF омоложение — внутренняя поверхность рук", price: "30 000 ₽", note: "60 мин" },
      { name: "LIFTERA-A2 · УЛЬТРАЗВУКОВОЙ ЛИФТИНГ", price: "", isHeader: true },
      { name: "Лифтинг и подтяжка лица", price: "80 000 ₽", note: "90 мин" },
      { name: "Лифтинг средней или нижней трети лица", price: "51 000 ₽", note: "60 мин" },
      { name: "Лифтинг средней и нижней трети лица", price: "65 000 ₽", note: "75 мин" },
      { name: "Лифтинг век", price: "30 000 ₽", note: "30 мин" },
      { name: "Лифтинг шеи", price: "30 000 ₽", note: "30 мин" },
      { name: "Лифтинг области подбородка", price: "30 000 ₽", note: "30 мин" },
      { name: "Лифтинг зоны декольте", price: "40 000 ₽", note: "45 мин" },
      { name: "Живот (от 500 до 800 линий)", price: "55 000 ₽", note: "60 мин" },
      { name: "Живот (от 800 до 1200 линий)", price: "80 000 ₽", note: "90 мин" },
      { name: "Внутренняя поверхность бёдер", price: "65 000 ₽", note: "90 мин" },
      { name: "VIVACE RF · МИКРОИГОЛЬЧАТЫЙ ЛИФТИНГ", price: "", isHeader: true },
      { name: "VIVACE RF — периорбитальная область", price: "20 000 ₽", note: "30 мин" },
      { name: "VIVACE RF — лицо + шея", price: "48 000 ₽", note: "60 мин" },
      { name: "VIVACE RF — лицо + шея + декольте", price: "60 000 ₽", note: "90 мин" },
      { name: "VIVACE RF — лицо", price: "33 000 ₽", note: "60 мин" },
      { name: "VIVACE RF — шея", price: "33 000 ₽", note: "45 мин" },
      { name: "VIVACE RF — нос/веки/щёки", price: "20 000 ₽", note: "30 мин" },
      { name: "VIVACE RF — ягодицы (до 2000 стеков)", price: "45 000 ₽", note: "120 мин" },
      { name: "VIVACE RF — живот (до 2000 степов)", price: "48 000 ₽", note: "90 мин" },
      { name: "VIVACE RF — колени", price: "30 000 ₽", note: "60 мин" },
      { name: "VIVACE RF — интимная зона", price: "31 000 ₽", note: "60 мин" },
      { name: "GUINOT (HYDRADERM)", price: "", isHeader: true },
      { name: "Миостимуляция для мгновенного лифтинга", price: "13 500 ₽", note: "60 мин" },
      { name: "HYDRADERMIE Lift — антивозрастная процедура", price: "15 000 ₽", note: "90 мин" },
      { name: "EYE LIFT — для области глаз", price: "9 000 ₽", note: "40 мин" },
      { name: "GENEO+", price: "", isHeader: true },
      { name: "GeneO+ «Омоложение и увлажнение»", price: "8 000 ₽", note: "60 мин" },
      { name: "GeneO+ «Омоложение и осветление»", price: "8 000 ₽", note: "60 мин" },
      { name: "GeneO+ RF-лифтинг (лицо + шея / шея + декольте)", price: "8 000 ₽", note: "45 мин" },
      { name: "GeneO+ Безынъекционная биоревитализация", price: "2 500 ₽", note: "15 мин" },
      { name: "GeneO+ Интенсивный комплекс «Омоложение и увлажнение»", price: "12 400 ₽", note: "90 мин" },
      { name: "OXY MEGASTATION · OXY-JET", price: "", isHeader: true },
      { name: "Вакуумный массаж (лицо)", price: "3 200 ₽", note: "20 мин" },
      { name: "Вакуумный массаж (лицо + шея + декольте)", price: "4 700 ₽", note: "30 мин" },
      { name: "Кислородный пилинг + эксфолиация", price: "7 700 ₽", note: "30 мин" },
      { name: "OXY-JET (безынъекционная мезотерапия) — лицо", price: "7 200 ₽", note: "60 мин" },
      { name: "ДАРСОНВАЛЬ", price: "", isHeader: true },
      { name: "Дарсонвализация", price: "1 700 ₽", note: "15 мин" },
      { name: "Локальное воздействие", price: "600 ₽", note: "10 мин" },
      { name: "BIOGENIE · МИКРОТОКОВАЯ ТЕРАПИЯ", price: "", isHeader: true },
      { name: "Dess Lift Luxe лицо + шея + декольте", price: "10 500 ₽", note: "45 мин" },
      { name: "Dess Lift Luxe + ампула", price: "13 500 ₽", note: "45 мин" },
      { name: "SKIN MASTER · УЛЬТРАЗВУКОВАЯ ТЕРАПИЯ", price: "", isHeader: true },
      { name: "Ультразвуковой пилинг", price: "2 200 ₽", note: "15 мин" },
      { name: "Ультразвуковое увлажнение", price: "2 200 ₽", note: "15 мин" },
      { name: "HydraPeeling (глубокий пилинг)", price: "4 000 ₽", note: "30 мин" },
      { name: "CO₂ ТЕРАПИЯ", price: "", isHeader: true },
      { name: "CO₂ Эксклюзивный массаж лица", price: "16 800 ₽", note: "90 мин" },
      { name: "CO₂ Карбокситерапия (1 зона)", price: "3 100 ₽", note: "15 мин" },
      { name: "LPG · ВАКУУМНО-РОЛИКОВАЯ ТЕХНОЛОГИЯ", price: "", isHeader: true },
      { name: "Вакуумный массаж LPG", price: "6 400 ₽", note: "45 мин" },
      { name: "Вакуумный дренаж лица LPG", price: "1 700 ₽", note: "10 мин" },
      { name: "REVITAL RF", price: "", isHeader: true },
      { name: "RF терапия — лицо", price: "7 000 ₽", note: "60 мин" },
      { name: "RF терапия — лицо + шея", price: "9 800 ₽", note: "75 мин" },
      { name: "RF терапия — шея", price: "6 100 ₽", note: "30 мин" },
      { name: "RF терапия — декольте", price: "6 100 ₽", note: "30 мин" },
      { name: "RF терапия — живот", price: "10 700 ₽", note: "45 мин" },
      { name: "RF терапия — ягодицы", price: "9 800 ₽", note: "45 мин" },
      { name: "RF терапия — галифе + бёдра", price: "9 800 ₽", note: "60 мин" },
      { name: "RF терапия — колени", price: "4 400 ₽", note: "30 мин" },
      { name: "EMSELLA", price: "", isHeader: true },
      { name: "Программа EMSELLA", price: "9 800 ₽", note: "30 мин" },
      { name: "X_WAVE · УДАРНО-ВОЛНОВАЯ ТЕРАПИЯ", price: "", isHeader: true },
      { name: "Программа целлюлит/подтяжка (1 зона)", price: "4 300 ₽" },
      { name: "Программа растяжки (бока/плечо/живот)", price: "3 100 ₽" },
      { name: "Программа шрамы", price: "2 500 ₽" },
      { name: "АППАРАТ HYDRAFACIAL", price: "", isHeader: true },
      { name: "Революционное омоложение", price: "14 900 ₽", note: "75 мин" },
      { name: "Лечение проблемной кожи", price: "11 600 ₽", note: "60 мин" },
      { name: "Программа для мужчин", price: "11 600 ₽", note: "60 мин" },
      { name: "Глубокое очищение и обновление", price: "8 300 ₽", note: "45 мин" },
      { name: "Лечение пигментации", price: "10 500 ₽", note: "45 мин" },
      { name: "Нежные ручки", price: "6 100 ₽", note: "30 мин" },
      { name: "Выход в свет", price: "13 800 ₽", note: "60 мин" },
      { name: "Безупречный макияж", price: "7 200 ₽", note: "30 мин" },
    ],
  },
  {
    id: "injection",
    num: "08",
    title: "Эстетическая медицина",
    subtitle: "Инъекционные процедуры",
    items: [
      { name: "МЕЗОТЕРАПИЯ", price: "", isHeader: true },
      { name: "NCTF 135 HA — 3 мл", price: "18 000 ₽" },
      { name: "F-Hair X", price: "12 000 ₽" },
      { name: "Manificare Booster 50", price: "12 000 ₽" },
      { name: "Atlantis Bright", price: "12 000 ₽" },
      { name: "Plinest Fast", price: "30 000 ₽" },
      { name: "Bellarti Nucleo 7.5", price: "25 000 ₽" },
      { name: "Bellarti Nucleo 20", price: "28 000 ₽" },
      { name: "Profhilo", price: "40 000 ₽" },
      { name: "Restylane Vital", price: "30 000 ₽" },
      { name: "Belotero ReVive — 1 мл", price: "25 000 ₽" },
      { name: "Belotero ReVive — 2 мл", price: "39 900 ₽" },
      { name: "БИОРЕВИТАЛИЗАЦИЯ", price: "", isHeader: true },
      { name: "Meso Wharton", price: "35 000 ₽" },
      { name: "Meso Xantine", price: "35 000 ₽" },
      { name: "Meso Eye C71", price: "35 000 ₽" },
      { name: "Meso Sculpt C71", price: "35 000 ₽" },
      { name: "Meso Orbit с ABG Labs (Eye C71 + Sculpt C71)", price: "65 000 ₽" },
      { name: "IAL System 1.8 — 1,8 мл", price: "22 000 ₽" },
      { name: "IAL System ACP — 1 мл", price: "25 000 ₽" },
      { name: "IAL System DUO — 2 мл", price: "30 000 ₽" },
      { name: "Итальянский лифтинг от IAL System (DUO + ACP)", price: "80 000 ₽" },
      { name: "Atlantis Classic", price: "22 000 ₽" },
      { name: "Atlantis Lift", price: "22 000 ₽" },
      { name: "Atlantis Eyes", price: "22 000 ₽" },
      { name: "Atlantis Aquaman", price: "22 000 ₽" },
      { name: "SkinElly Meso", price: "15 000 ₽" },
      { name: "SkinElly Meso Extra", price: "22 000 ₽" },
      { name: "Plinest", price: "30 000 ₽" },
      { name: "КОЛЛАГЕНОТЕРАПИЯ", price: "", isHeader: true },
      { name: "Коллост 7% — 0,5 мл", price: "20 000 ₽" },
      { name: "Коллост 7% — 1 мл", price: "25 000 ₽" },
      { name: "Коллост 7% — 1,5 мл", price: "30 000 ₽" },
      { name: "Коллост 15% — 1 мл", price: "32 000 ₽" },
      { name: "Коллост 15% — 1,5 мл", price: "40 000 ₽" },
      { name: "Коллост микро", price: "35 000 ₽" },
      { name: "Mevita C", price: "26 000 ₽" },
      { name: "Karisma", price: "40 000 ₽" },
      { name: "КОНТУРНАЯ ПЛАСТИКА", price: "", isHeader: true },
      { name: "Belotero Soft", price: "27 000 ₽" },
      { name: "Belotero Balance", price: "28 000 ₽" },
      { name: "Belotero Intense", price: "34 000 ₽" },
      { name: "Belotero Volume", price: "34 000 ₽" },
      { name: "Belotero Lips Shape — 0,6 мл", price: "22 000 ₽" },
      { name: "Belotero Lips Contour — 0,6 мл", price: "22 000 ₽" },
      { name: "Губы от Belotero (Lips Shape + Lips Contour)", price: "40 000 ₽" },
      { name: "SkinElly Light", price: "21 000 ₽" },
      { name: "SkinElly Soft", price: "24 000 ₽" },
      { name: "SkinElly Middle", price: "27 000 ₽" },
      { name: "SkinElly Intense", price: "29 000 ₽" },
      { name: "SkinElly Intense Sub Q — 2 мл", price: "37 000 ₽" },
      { name: "Neauvia Organic Stimulate", price: "35 000 ₽" },
      { name: "Neauvia Organic Intense Rheology", price: "30 000 ₽" },
      { name: "Neauvia Organic Intense Lips", price: "30 000 ₽" },
      { name: "Neauvia Organic Hydro Deluxe — 2,5 мл", price: "30 000 ₽" },
      { name: "Restylane", price: "38 000 ₽" },
      { name: "Restylane Lyft", price: "40 000 ₽" },
      { name: "Radiesse — 1,5 мл", price: "42 000 ₽" },
      { name: "Radiesse — 3 мл", price: "72 000 ₽" },
      { name: "ПОЛИМОЛОЧНАЯ КИСЛОТА (SCULPTRA)", price: "", isHeader: true },
      { name: "Sculptra — лицо", price: "85 000 ₽" },
      { name: "Sculptra — шея", price: "85 000 ₽" },
      { name: "Sculptra — лицо + шея", price: "140 000 ₽" },
      { name: "Sculptra — лицо + шея + декольте", price: "180 000 ₽" },
      { name: "Sculptra — живот", price: "220 000 ₽" },
      { name: "Sculptra — ягодицы", price: "220 000 ₽" },
      { name: "ПОЛИМОЛОЧНАЯ КИСЛОТА (AESTHEFILL)", price: "", isHeader: true },
      { name: "Aesthefill — лицо", price: "80 000 ₽" },
      { name: "Aesthefill — лицо + шея", price: "130 000 ₽" },
      { name: "Aesthefill — лицо + шея + декольте", price: "170 000 ₽" },
      { name: "Aesthefill — живот", price: "210 000 ₽" },
      { name: "РЕГЕНЕРАЦИЯ (RENEALL)", price: "", isHeader: true },
      { name: "Reneall — лицо", price: "30 000 ₽" },
      { name: "Reneall — губы", price: "30 000 ₽" },
      { name: "Reneall — лицо + шея", price: "50 000 ₽" },
      { name: "Reneall — лицо + шея + декольте", price: "80 000 ₽" },
      { name: "Сферогель Light — 0,6 мл", price: "20 000 ₽" },
      { name: "Сферогель Medium — 0,6 мл", price: "22 000 ₽" },
      { name: "БОТУЛИНОТЕРАПИЯ", price: "", isHeader: true },
      { name: "Миотокс — 1 ед.", price: "600 ₽" },
      { name: "Ксеомин — 1 ед.", price: "600 ₽" },
      { name: "Диспорт — 1 ед.", price: "400 ₽" },
      { name: "Релатокс — 1 ед.", price: "700 ₽" },
      { name: "БТА 1 зона", price: "9 000 ₽" },
      { name: "БТА верхняя треть", price: "22 000 ₽" },
      { name: "БТА шея", price: "35 000 ₽" },
      { name: "Лифтинг Нефертити", price: "35 000 ₽" },
      { name: "Full Face", price: "50 000 ₽" },
      { name: "Коррекция гипергидроза", price: "45 000 ₽" },
      { name: "Гиалуронидаза", price: "12 000 ₽" },
      { name: "КОНТУРНАЯ ПЛАСТИКА ТЕЛА", price: "", isHeader: true },
      { name: "Естественное округление ягодиц", price: "250 000 ₽" },
      { name: "Brazilian Butt Lift (попа как у Ким)", price: "350 000 ₽" },
      { name: "Округление бёдер и заполнение ямок", price: "220 000 ₽" },
    ],
  },
  {
    id: "spa",
    num: "09",
    title: "Массаж и СПА",
    subtitle: "Ритуалы восстановления",
    items: [
      { name: "МАССАЖ", price: "", isHeader: true },
      { name: "Массаж по зонам (шейно-воротниковая / голова)", price: "5 000 ₽", note: "20 мин" },
      { name: "Массаж по зонам (бёдра / ноги / спина / живот / руки)", price: "6 500 ₽", note: "30 мин" },
      { name: "Общий массаж", price: "7 000 ₽", note: "30 мин" },
      { name: "Общий массаж", price: "9 500 ₽", note: "60 мин" },
      { name: "Общий массаж", price: "13 500 ₽", note: "90 мин" },
      { name: "Foot массаж", price: "6 000 ₽", note: "30 мин" },
      { name: "Релакс-массаж", price: "8 500 ₽", note: "60 мин" },
      { name: "Релакс-массаж", price: "10 500 ₽", note: "90 мин" },
      { name: "Спортивный массаж", price: "11 500 ₽", note: "60 мин" },
      { name: "Спортивный массаж", price: "13 000 ₽", note: "90 мин" },
      { name: "Антицеллюлитный / Лимфодренажный массаж", price: "6 500 ₽", note: "30 мин" },
      { name: "Антицеллюлитный / Лимфодренажный массаж", price: "9 000 ₽", note: "60 мин" },
      { name: "Массаж «Бразильская попка»", price: "6 500 ₽", note: "30 мин" },
      { name: "Массаж для подтягивания тонуса кожи", price: "9 500 ₽", note: "60 мин" },
      { name: "Стоун-массаж", price: "9 000 ₽", note: "60 мин" },
      { name: "Стоун-массаж", price: "13 500 ₽", note: "90 мин" },
      { name: "Авторские методики массажа", price: "11 500 ₽", note: "60 мин" },
      { name: "Авторские методики массажа", price: "14 500 ₽", note: "90 мин" },
      { name: "Массаж баночный", price: "7 000 ₽", note: "30 мин" },
      { name: "Массаж баночный", price: "13 500 ₽", note: "60 мин" },
      { name: "Массаж медовый", price: "7 000 ₽", note: "30 мин" },
      { name: "Массаж Когао", price: "16 800 ₽", note: "105 мин" },
      { name: "Массаж Коруги", price: "14 900 ₽", note: "40 мин" },
      { name: "Массаж Коруги", price: "19 700 ₽", note: "90 мин" },
      { name: "Массаж Рукако", price: "7 700 ₽", note: "30 мин" },
      { name: "Массаж Кобидо", price: "13 000 ₽", note: "90 мин" },
      { name: "АВТОРСКИЕ МЕТОДИКИ (АК)", price: "", isHeader: true },
      { name: "Авторские методики массажа (АК)", price: "16 500 ₽", note: "60 мин" },
      { name: "Авторские методики массажа (АК)", price: "22 000 ₽", note: "90 мин" },
      { name: "RF VENUS LEGACY", price: "", isHeader: true },
      { name: "RF Venus Legacy — лицо", price: "9 000 ₽", note: "30 мин" },
      { name: "RF Venus Legacy — лицо + шея", price: "12 500 ₽", note: "60 мин" },
      { name: "RF Venus Legacy — лицо + шея + декольте", price: "15 500 ₽", note: "90 мин" },
      { name: "RF Venus Legacy — шея", price: "8 000 ₽", note: "30 мин" },
      { name: "RF Venus Legacy — глаза", price: "7 000 ₽", note: "30 мин" },
      { name: "RF Venus Legacy — живот", price: "9 500 ₽", note: "30 мин" },
      { name: "RF Venus Legacy — живот + талия", price: "10 500 ₽", note: "60 мин" },
      { name: "RF Venus Legacy — ягодицы", price: "9 500 ₽", note: "30 мин" },
      { name: "RF Venus Legacy — бёдра", price: "9 500 ₽", note: "30 мин" },
      { name: "RF Venus Legacy — бёдра + ягодицы", price: "12 500 ₽", note: "60 мин" },
      { name: "RF Venus Legacy — плечи", price: "8 500 ₽", note: "30 мин" },
      { name: "RF Venus Legacy — руки", price: "9 000 ₽", note: "30 мин" },
      { name: "RF Venus Legacy — колени", price: "6 000 ₽", note: "30 мин" },
      { name: "RF Venus Legacy — тело полностью", price: "18 500 ₽", note: "90 мин" },
      { name: "КРИОКАПСУЛА", price: "", isHeader: true },
      { name: "Криокамера — общеукрепляющее воздействие (15 мин)", price: "7 000 ₽", note: "15 мин" },
      { name: "ПИЛИНГ И ОБЁРТЫВАНИЕ ТЕЛА", price: "", isHeader: true },
      { name: "Пилинг тела", price: "2 900 — 7 700 ₽", note: "20 мин" },
      { name: "Обёртывание (антицеллюлитное / лимфодренажное / лифтинг)", price: "7 700 — 15 000 ₽", note: "60 мин" },
      { name: "УХОДЫ THALION · ТЕЛО", price: "", isHeader: true },
      { name: "Пилинг-скраб Thalion", price: "7 000 ₽", note: "30 мин" },
      { name: "Энергия морской воды", price: "12 500 ₽", note: "60 мин" },
      { name: "Обёртывание «Морское утончение»", price: "12 500 ₽", note: "60 мин" },
      { name: "Антицеллюлитный уход Thalion", price: "15 000 ₽", note: "60 мин" },
      { name: "УХОДЫ THALION · ЛИЦО", price: "", isHeader: true },
      { name: "Энергия и сияние Thalion", price: "10 000 ₽", note: "60 мин" },
      { name: "Скульптор вечной молодости Thalion", price: "25 000 ₽", note: "90 мин" },
      { name: "CELLSPA", price: "", isHeader: true },
      { name: "Уход CellSpa — тело", price: "16 500 ₽", note: "90 мин" },
      { name: "СПА-ПРОГРАММЫ", price: "", isHeader: true },
      { name: "Программа Антистресс (шоколадная терапия)", price: "7 000 ₽", note: "60 мин" },
      { name: "Программа для коррекции фигуры (шоколадная терапия)", price: "9 000 ₽", note: "60 мин" },
      { name: "Программа Spa Detox", price: "12 500 ₽", note: "60 мин" },
      { name: "Программа Spa Anti-Age", price: "12 500 ₽", note: "60 мин" },
      { name: "Программа Spa Anti-Stress", price: "12 500 ₽", note: "60 мин" },
      { name: "Программа Spa снижение веса", price: "12 500 ₽", note: "60 мин" },
    ],
  },
];

function highlight(text: string, query: string) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-black/10 text-black rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function PriceCategory({ cat }: { cat: PriceCategory }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <button
          onClick={() => setOpen(!open)}
          className="w-full py-10 flex items-center justify-between group"
        >
          <div className="flex items-center gap-8">
            <span className="text-xs font-mono text-black/30">{cat.num}</span>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.4em] text-black/40 mb-1">{cat.subtitle}</p>
              <h2 className="font-extralight tracking-[-0.03em] text-3xl md:text-4xl text-black group-hover:translate-x-1 transition-transform duration-300">
                {cat.title}
              </h2>
            </div>
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 ml-6"
          >
            <ChevronDown size={20} className="text-black/40" />
          </motion.div>
        </button>

        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="pb-12">
            <div className="border-t border-black/10">
              {cat.items.map((item, i) =>
                item.isHeader ? (
                  <div
                    key={i}
                    className="mt-8 mb-2 first:mt-0 px-2 -mx-2"
                  >
                    <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-black/40">
                      {item.name}
                    </span>
                    <div className="mt-2 border-t border-black/8" />
                  </div>
                ) : (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.02, 0.4) }}
                    className="flex items-center justify-between py-4 border-b border-black/5 group/row hover:bg-black/[0.02] px-2 -mx-2 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-base md:text-lg font-light text-black">{item.name}</span>
                      {item.note && (
                        <span className="text-[9px] uppercase tracking-[0.25em] text-black/30 bg-black/5 px-2 py-1 hidden sm:inline shrink-0">
                          {item.note}
                        </span>
                      )}
                    </div>
                    <span className="text-sm md:text-base font-light text-black/70 ml-4 shrink-0">{item.price}</span>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Price() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const results: { item: PriceItem; categoryTitle: string; categoryId: string }[] = [];
    for (const cat of priceCategories) {
      for (const item of cat.items) {
        if (!item.isHeader && item.name.toLowerCase().includes(q)) {
          results.push({ item, categoryTitle: cat.title, categoryId: cat.id });
        }
      }
    }
    return results;
  }, [query]);

  return (
    <div className="bg-[#F1EBE3] text-black">
      <section ref={heroRef} className="relative h-[80vh] overflow-hidden bg-black text-white">
        <motion.video
          src="/images/services-reel.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          style={{ y, scale: 1.08 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/65" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-20">
          <div className="max-w-7xl mx-auto w-full">
            <FadeIn>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/60">
                — Прайс-лист · 9 направлений
              </span>
            </FadeIn>
            <h1 className="mt-6 font-extralight tracking-[-0.04em] leading-[0.85] text-[clamp(3.5rem,12vw,12rem)]">
              <SplitText text="Прайс." />
            </h1>
            <FadeIn delay={0.4}>
              <p className="mt-8 max-w-xl text-base md:text-lg font-light text-white/60 leading-relaxed">
                Актуальные цены на все услуги. Точная стоимость рассчитывается
                на консультации — индивидуально для каждого гостя.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="bg-[#1A1A1A] text-white py-6 border-y border-white/10">
        <Marquee
          text="ПРАЙС-ЛИСТ · PRICE LIST · ТАРИФЫ · TARIFF · "
          speed={40}
          className="text-xl md:text-3xl font-extralight uppercase tracking-[0.3em]"
        />
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-10 border-b border-black/10">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по услугам..."
            className="w-full bg-black/[0.04] border border-black/10 pl-11 pr-10 py-4 text-sm font-light text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-black transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <AnimatePresence>
          {query.trim() && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-6"
            >
              {searchResults.length === 0 ? (
                <p className="text-sm font-light text-black/40 py-4">
                  Ничего не найдено по запросу «{query}»
                </p>
              ) : (
                <>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-black/40 mb-4">
                    Найдено: {searchResults.length} {searchResults.length === 1 ? "услуга" : searchResults.length < 5 ? "услуги" : "услуг"}
                  </p>
                  <div className="border-t border-black/10">
                    {searchResults.map(({ item, categoryTitle }, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.2 }}
                        className="flex items-center justify-between py-4 border-b border-black/5 hover:bg-black/[0.02] px-2 -mx-2 transition-colors"
                      >
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="min-w-0">
                            <p className="text-base font-light text-black truncate">
                              {highlight(item.name, query)}
                            </p>
                            <p className="text-[9px] uppercase tracking-[0.25em] text-black/35 mt-0.5">
                              {categoryTitle}{item.note ? ` · ${item.note}` : ""}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-light text-black/70 ml-4 shrink-0">{item.price}</span>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!query.trim() && (
        <div className="border-t border-black/10">
          {priceCategories.map((cat) => (
            <PriceCategory key={cat.id} cat={cat} />
          ))}
        </div>
      )}

      <section className="py-24 md:py-32 px-6 md:px-16 bg-[#F1EBE3]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-black/40 mb-4">— Индивидуальный подбор</p>
            <h2 className="font-extralight tracking-[-0.03em] text-3xl md:text-5xl text-black leading-tight">
              Не знаете, что выбрать?<br />Мы поможем.
            </h2>
            <p className="mt-6 text-sm font-light text-black/50 max-w-md leading-relaxed">
              Наши специалисты бесплатно проконсультируют и подберут оптимальный протокол
              именно для вас — с учётом особенностей и пожеланий.
            </p>
          </div>
          <Link
            href="/contacts"
            className="shrink-0 px-10 py-5 bg-black text-white text-xs font-semibold uppercase tracking-widest hover:bg-black/80 transition-colors"
          >
            Записаться на консультацию
          </Link>
        </div>
      </section>
    </div>
  );
}
