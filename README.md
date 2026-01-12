# myQ Enterprise Sales Training Module

Interactive training module for myQ Enterprise dock management solution, built for the Smithfield Foods presentation.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Deploy (zero config needed)

---

## IMAGE PLACEHOLDERS

Place the following images in `/public/images/` with the exact filenames shown:

| Filename | Source Document | What to Screenshot |
|----------|-----------------|-------------------|
| `IMG-01.png` | (Optional) | Cold storage/refrigerated dock facility photo |
| `IMG-02.png` | **iDockLinkandmyQBrochure.pdf (page 1)** | System architecture diagram showing: iDock Link → iDock Gateway → Cloud → myQ Dashboard. The flow diagram with arrows. |
| `IMG-03.png` | **s_idock_optional_hardware_4111_0092_aug2021.pdf (page 10)** | Sensor placement diagram showing all sensors positioned on a loading dock (Transport Vehicle Present, Leveler Stored, Forklift Activity, Door Open/Closed, Restraint Engaged, Hydraulic Fluid Level) |
| `IMG-04.png` | **s_idock_optional_hardware_4111_0092_aug2021.pdf (page 7)** | iDock Controller panel close-up showing the buttons, message display, and LED lights |
| `IMG-05.png` | **Truck_Present_sensor.pdf (page 1)** | Photo of the Trailer Present Sensor mounted on exterior with the 3-color light visible |
| `IMG-06.png` | **iDockLinkandmyQBrochure.pdf (page 2)** | Real-time dock status grid showing "Dock Positions" with color-coded status indicators |
| `IMG-07.png` | **iDockLinkandmyQBrochure.pdf (page 2)** | "Carrier Detention Costs" horizontal bar chart showing detention fees by carrier |
| `IMG-08.png` | **iDockLinkandmyQBrochure.pdf (page 2)** | "Dock Usage Over Time" heatmap showing busy hours/days |
| `IMG-09.png` | **iDockLinkandmyQBrochure.pdf (page 2)** | Session timeline detail showing "Dock 1 Session" with truck-at-dock breakdown (Restraint Engaged, Door Open, Leveler Deployed, Forklift Activity bars) |

### How to Capture Images

1. Open each PDF in a viewer
2. Navigate to the specified page
3. Take a screenshot of the specified element
4. Save as PNG with the exact filename
5. Place in `/public/images/`

The app will automatically display images if they exist, or show placeholder cards if they don't.

---

## Features

- **7 Training Sections**: Pain points → Solution → Hardware → Analytics → Scenarios → Pitches → Assessment
- **Interactive Scenarios**: 6 realistic Smithfield situations
- **Knowledge Checks**: Reinforce learning after each section
- **Presentation Mode**: Clean slides for screen sharing with clients
- **Final Assessment**: 10-question quiz with 70% passing score
- **Mobile Responsive**: Works on iPad for field presentations

## Tech Stack

- Next.js 14
- React 18
- Tailwind CSS
- TypeScript
