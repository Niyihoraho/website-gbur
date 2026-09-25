import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const staffCards = [
  {
    id: 'GBUR-2026-001',
    first_name: 'Samson',
    last_name: 'NZAYISENGA',
    position: 'National General Secretary',
    department: 'National Leadership',
    work_field: 'GBUR Head Office - Kigali City',
    universities_in_charge: [],
    validity: '2027-12-31',
    image_url: '/cards/samson.jpg',
  },
  {
    id: 'GBUR-2026-002',
    first_name: 'Alex',
    last_name: 'SHYAKA',
    position: 'National Students Ministry Coordinator',
    department: 'Students Ministry',
    work_field: 'GBUR Office - Kigali City',
    universities_in_charge: [],
    validity: '2027-12-31',
    image_url: '/cards/Alex.jpg',
  },
  {
    id: 'GBUR-2026-003',
    first_name: 'Enos',
    last_name: 'NKURUNZIZA',
    position: 'Campus Staff',
    department: 'Students Ministry',
    work_field: 'Kigali City',
    universities_in_charge: [
      'University of Rwanda - Remera Campus',
      'Adventist University of Central Africa (AUCA)',
      'East African Christian College (EACC)',
      'Mount Kigali University (MKU)',
      'Kigali Independent University (ULK)',
      'Institut d’Enseignement Supérieur de Ruhengeri (INES)',
    ],
    validity: '2027-12-31',
    image_url: '/cards/Enos.png',
  },
  {
    id: 'GBUR-2026-004',
    first_name: 'Suzan',
    last_name: 'MUKANDASUMBWA',
    position: 'Campus Staff',
    department: 'Students Ministry',
    work_field: 'Kigali City',
    universities_in_charge: [
      'University of Rwanda - Gikondo Campus',
      'Institut Catholique de Kabgayi (ICK)',
      'University of Gitwe (UG)',
    ],
    validity: '2027-12-31',
    image_url: '/cards/suzan.jpg',
  },
  {
    id: 'GBUR-2026-005',
    first_name: 'David',
    last_name: 'DUKUZE',
    position: 'Campus Staff',
    department: 'Students Ministry',
    work_field: 'Kigali City',
    universities_in_charge: [
      'University of Rwanda - Nyarugenge Campus',
      'University of Kigali (UoK) - Kigali Campus',
      'Kigali Independent University (ULK)',
      'University of Technology and Arts of Byumba (UTAB)',
    ],
    validity: '2027-12-31',
    image_url: '/cards/David dukuze.png',
  },
  {
    id: 'GBUR-2026-006',
    first_name: 'Heroine',
    last_name: 'NYIRAMUGISHA',
    position: 'Campus Staff',
    department: 'Students Ministry',
    work_field: 'Southern Province',
    universities_in_charge: [
      'University of Rwanda - Huye Campus',
      'University of Rwanda - Nyamagabe Campus',
      'Protestant Institute of Arts and Social Sciences (PIASS)',
    ],
    validity: '2027-12-31',
    image_url: '/cards/Heroic.png',
  },
  {
    id: 'GBUR-2026-007',
    first_name: 'Xavier',
    last_name: 'NZAYISENGA',
    position: 'Campus Staff',
    department: 'Students Ministry',
    work_field: 'Southern Province',
    universities_in_charge: [
      'University of Rwanda - Huye Campus',
      'University of Rwanda - Nyamagabe Campus',
      'Protestant Institute of Arts and Social Sciences (PIASS)',
    ],
    validity: '2027-12-31',
    image_url: '/cards/Xavier.jpg',
  },
  {
    id: 'GBUR-2026-008',
    first_name: 'Aime',
    last_name: 'IRADUKUNDA',
    position: 'Campus Staff',
    department: 'Students Ministry',
    work_field: 'Southern Province',
    universities_in_charge: [
      'University of Rwanda - Busogo Campus',
      'University of Rwanda - Nyagatare Campus',
      'University of Rwanda - Rwamagana Campus',
    ],
    validity: '2027-12-31',
    image_url: '/cards/aime.jpg',
  },
  {
    id: 'GBUR-2026-009',
    first_name: 'Nuriat',
    last_name: 'MUREKATETE',
    position: 'Campus Staff',
    department: 'Students Ministry',
    work_field: 'Southern Province',
    universities_in_charge: [
      'University of Rwanda - Busogo Campus',
      'University of Rwanda - Nyagatare Campus',
      'University of Rwanda - Rwamagana Campus',
    ],
    validity: '2027-12-31',
    image_url: '/cards/Nuliathe.png',
  },
  {
    id: 'GBUR-2026-010',
    first_name: 'Emelyne',
    last_name: 'UWAMAHORO',
    position: 'Campus Staff',
    department: 'Students Ministry',
    work_field: 'Eastern Province',
    universities_in_charge: [
      'University of Rwanda - Rukara Campus',
      'University of Rwanda - Nyagatare Campus',
      'University of Rwanda - Rwamagana Campus',
      'Kibogora Polytechnic (KP)',
      'University of Tourism, Technology and Business Studies (UTB)',
    ],
    validity: '2027-12-31',
    image_url: '/cards/Emeline.jpg',
  },
  {
    id: 'GBUR-2026-011',
    first_name: 'Isimbi',
    last_name: 'KABATESI',
    position: 'Campus Staff',
    department: 'Students Ministry',
    work_field: 'Eastern Province',
    universities_in_charge: [
      'University of Rwanda - Rukara Campus',
      'University of Rwanda - Nyagatare Campus',
      'University of Rwanda - Rwamagana Campus',
      'Kibogora Polytechnic (KP)',
      'University of Tourism, Technology and Business Studies (UTB)',
    ],
    validity: '2027-12-31',
    image_url: '/cards/Isimbi.png',
  },
  {
    id: 'GBUR-2026-012',
    first_name: 'Isaac',
    last_name: 'NIYONZIMA',
    position: 'Accountant',
    department: 'Finance and Administration',
    work_field: 'GBUR Office - Kigali City',
    universities_in_charge: [],
    validity: '2027-12-31',
    image_url: '/cards/Isaac.jpg',
  },
  {
    id: 'GBUR-2026-013',
    first_name: 'Ivan',
    last_name: 'NKURUNZIZA',
    position: 'Communication Officer',
    department: 'Communication',
    work_field: 'GBUR Office - Kigali City',
    universities_in_charge: [],
    validity: '2027-12-31',
    image_url: '/cards/Ivan.jpg',
  },
  {
    id: 'GBUR-2026-014',
    first_name: 'Patrick',
    last_name: 'BYAMUNGU',
    position: 'Ministry Support Services Coordinator',
    department: 'Support Services',
    work_field: 'GBUR Office - Kigali City',
    universities_in_charge: [],
    validity: '2027-12-31',
    image_url: '/cards/Patrick.jpg',
  },
  {
    id: 'GBUR-2026-015',
    first_name: 'Jean Baptiste',
    last_name: 'BYIRINGIRO',
    position: 'Resource Mobilization Officer',
    department: 'Partnership and Resource Mobilization',
    work_field: 'GBUR Office - Kigali City',
    universities_in_charge: [],
    validity: '2027-12-31',
    image_url: '/cards/Byiringiro.jpg',
  },
  {
    id: 'GBUR-2026-016',
    first_name: 'Joseph',
    last_name: 'KABALISA',
    position: 'National STEM Coordinator',
    department: 'Students Ministry',
    work_field: 'GBUR Office - Kigali City',
    universities_in_charge: [],
    validity: '2027-12-31',
    image_url: '/cards/Joseph.jpg',
  },
]

async function main() {
  console.log('Seeding staff cards...')
  for (const card of staffCards) {
    await prisma.$executeRawUnsafe(
      `INSERT INTO public.staff_card (id, first_name, last_name, position, department, work_field, universities_in_charge, validity, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8::date, $9)
       ON CONFLICT (id) DO UPDATE SET
         first_name = EXCLUDED.first_name,
         last_name = EXCLUDED.last_name,
         position = EXCLUDED.position,
         department = EXCLUDED.department,
         work_field = EXCLUDED.work_field,
         universities_in_charge = EXCLUDED.universities_in_charge,
         validity = EXCLUDED.validity,
         image_url = EXCLUDED.image_url;`,
      card.id,
      card.first_name,
      card.last_name,
      card.position,
      card.department,
      card.work_field,
      card.universities_in_charge,
      card.validity,
      card.image_url
    )
    console.log(`✓ Seeded card: ${card.id} (${card.first_name} ${card.last_name})`)
  }
  console.log('All 16 staff cards seeded successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding staff cards:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
