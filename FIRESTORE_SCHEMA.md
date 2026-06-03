# Firestore Schema – Portfolio Admin

## Collection & Document Structure

```
portfolio/                        ← collection (tên: "portfolio")
├── about                         ← document ID
├── skills                        ← document ID
├── experience                    ← document ID
├── projects                      ← document ID
└── settings                      ← document ID
```

Chỉ có **1 collection** duy nhất tên `portfolio`, với **5 documents** cố định.

---

## Documents

### `portfolio/about`

| Field              | Type     | Example                                      |
|--------------------|----------|----------------------------------------------|
| `name`             | string   | `"Dang Huynh Huy"`                           |
| `bio`              | string   | `"I enjoy innovating…"`                      |
| `location`         | string   | `"Go Vap, Ho Chi Minh"`                      |
| `when`             | string   | `"2021 - Present"`                           |
| `storyDescription` | string   | `"I was born and raised…"`                   |
| `email`            | string   | `"danghuynhhuy776@gmail.com"`                |
| `resumeLink`       | string   | `"https://drive.google.com/…"`               |

---

### `portfolio/skills`

| Field               | Type       | Example                                   |
|---------------------|------------|-------------------------------------------|
| `technical`         | string[]   | `["HTML5", "CSS3", "TypeScript"]`         |
| `frameworks`        | string[]   | `["ReactJS", "NextJS", "VueJS"]`          |
| `libraries`         | string[]   | `["Redux", "TailwindCSS", "GSAP"]`        |
| `tools`             | string[]   | `["Git", "Figma", "Postman"]`             |
| `projectManagement` | string[]   | `["GitHub", "Trello", "Lark"]`            |
| `others`            | string[]   | `["English Toeic 650", "Restful API"]`    |

---

### `portfolio/experience`

| Field   | Type              |
|---------|-------------------|
| `items` | ExperienceItem[]  |

**ExperienceItem:**

| Field         | Type    | Example                        |
|---------------|---------|--------------------------------|
| `id`          | string  | `"uuid-v4"`                    |
| `company`     | string  | `"English Wing"`               |
| `role`        | string  | `"Frontend Developer"`         |
| `startDate`   | string  | `"Jan 2023"`                   |
| `endDate`     | string  | `"Present"` (nếu current=true) |
| `description` | string  | `"Built UI for…"`              |
| `current`     | boolean | `true`                         |

---

### `portfolio/projects`

| Field   | Type          |
|---------|---------------|
| `items` | ProjectItem[] |

**ProjectItem:**

| Field          | Type              | Example                           |
|----------------|-------------------|-----------------------------------|
| `id`           | string            | `"uuid-v4"`                       |
| `thumb`        | string            | `"/metaverse.png"`                |
| `name`         | string            | `"Wing metaverse"`                |
| `date`         | string            | `"Mar 2024 - Present"`            |
| `description`  | string            | `"Website for learning…"`         |
| `role`         | string            | `"Build UI, connect APIs…"`       |
| `technologies` | string            | `"ReactJS, TailwindCSS…"`         |
| `type`         | `"web" \| "app"` | `"web"`                           |
| `link`         | string (optional) | `"https://debate.englishwing.com"`|
| `ios`          | string (optional) | `"https://apps.apple.com/…"`      |
| `android`      | string (optional) | `"https://play.google.com/…"`     |

---

### `portfolio/settings`

| Field          | Type   | Example                              |
|----------------|--------|--------------------------------------|
| `siteTitle`    | string | `"Dang Huynh Huy – Portfolio"`       |
| `contactEmail` | string | `"danghuynhhuy776@gmail.com"`        |
| `resumeLink`   | string | `"https://drive.google.com/…"`       |
| `githubUrl`    | string | `"https://github.com/HuyDang92"`     |
| `linkedinUrl`  | string | `"https://linkedin.com/in/…"`        |

---

## ERD Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  COLLECTION: portfolio                                      │
│                                                             │
│  ┌──────────┐   ┌──────────┐   ┌─────────────┐            │
│  │  about   │   │  skills  │   │  settings   │            │
│  │──────────│   │──────────│   │─────────────│            │
│  │ name     │   │technical │   │ siteTitle   │            │
│  │ bio      │   │frameworks│   │contactEmail │            │
│  │ location │   │libraries │   │ resumeLink  │            │
│  │ when     │   │ tools    │   │ githubUrl   │            │
│  │ story    │   │ pm       │   │ linkedinUrl │            │
│  │ email    │   │ others   │   └─────────────┘            │
│  │resumeLink│   └──────────┘                              │
│  └──────────┘                                              │
│                                                             │
│  ┌─────────────────────────┐   ┌──────────────────────┐   │
│  │       experience        │   │       projects       │   │
│  │─────────────────────────│   │──────────────────────│   │
│  │ items: [                │   │ items: [             │   │
│  │   { id, company, role,  │   │   { id, thumb, name, │   │
│  │     startDate, endDate, │   │     date, desc, role,│   │
│  │     description,        │   │     technologies,    │   │
│  │     current }           │   │     type, link?,     │   │
│  │   ...                   │   │     ios?, android? } │   │
│  │ ]                       │   │   ...                │   │
│  └─────────────────────────┘   │ ]                    │   │
│                                └──────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Firebase Console Setup

1. Vào **Firebase Console** → chọn project
2. Sidebar → **Firestore Database** → **Create database**
3. Chọn **Start in production mode** → chọn region `asia-southeast1` (Singapore)
4. Sau khi tạo xong, **không cần tạo collection thủ công** — lần đầu admin bấm "Save Changes" sẽ tự tạo

### Security Rules (dán vào Rules tab)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read for portfolio data
    match /portfolio/{document} {
      allow read: if true;
      allow write: if false; // writes only via admin SDK / service account
    }
  }
}
```

> **Lưu ý:** Rules hiện tại cho phép write từ client (dev mode). Sau khi xong dev, đổi `allow write: if false` và dùng Firebase Admin SDK hoặc Cloud Functions để write từ server.
