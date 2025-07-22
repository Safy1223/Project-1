# تطبيق مهام متكامل (Full-Stack To-Do App)

تطبيق ويب متكامل لإدارة المهام تم بناؤه باستخدام React.js و Supabase. يتيح للمستخدمين تسجيل حسابات آمنة، وإدارة مهامهم اليومية، وتحديث ملفاتهم الشخصية.

**[رابط مباشر للتطبيق](https://spiffy-sherbet-bf6b9b.netlify.app/)**

## الميزات الرئيسية

- **مصادقة كاملة:** تسجيل مستخدم جديد، تسجيل الدخول، وتسجيل الخروج.
- **إعادة تعيين كلمة المرور:** إمكانية إرسال رابط لإعادة تعيين كلمة المرور إلى بريد المستخدم.
- **إدارة المهام (CRUD):** إضافة، تعديل، حذف، ووضع علامة "مكتمل" على المهام.
- **إدارة الملف الشخصي:** تحديث اسم المستخدم وصورة الملف الشخصي.
- **واجهة مستخدم تفاعلية:** تصميم نظيف باستخدام Material-UI.
- **دعم متعدد اللغات:** استخدام `i18next` لتهيئة التطبيق لدعم لغات متعددة.

## التقنيات المستخدمة

- **الواجهة الأمامية:** React.js, React Router, Context API
- **الواجهة الخلفية وقاعدة البيانات:** Supabase (Authentication & Database)
- **مكتبة التصميم:** Material-UI (MUI)
- **الترجمة:** i18next
- **النشر:** Netlify

## كيفية تشغيل المشروع محليًا

1.  **نسخ المستودع:**

    ```bash
    git clone https://github.com/Safy1223/Project-1.git
    cd Project-1
    ```

2.  **تثبيت الاعتماديات:**

    ```bash
    npm install
    ```

3.  **إعداد متغيرات البيئة:** - أنشئ ملف `.env` في جذر المشروع. - أضف مفاتيح Supabase الخاصة بك:
    `REACT_APP_SUPABASE_URL=https://lukbskkkvrtwyzzpclbc.supabase.co
REACT_APP_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1a2Jza2trdnJ0d3l6enBjbGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3Nzg5MTcsImV4cCI6MjA2NDM1NDkxN30.hbPKPx-a4Eq-Hx_-f3efYG6L1MRTvpwgq5vZX4DsQSo
     `

4.  **تشغيل المشروع:**
    ```bash
    npm start
    ```
