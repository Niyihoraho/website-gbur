const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding blog categories...')

  const categories = [
    { name: 'Spiritual Formation', slug: 'spiritual-formation', order: 1 },
    { name: 'Scripture', slug: 'scripture', order: 2 },
    { name: 'Community and Relationships', slug: 'community-and-relationships', order: 3 },
    { name: 'Ethnicity, Reconciliation, and Justice', slug: 'ethnicity-reconciliation-and-justice', order: 4 },
    { name: 'Sharing Your Faith', slug: 'sharing-your-faith', order: 5 },
    { name: 'Beyond Campus', slug: 'beyond-campus', order: 6 },
    { name: 'Alumni and Staff Profiles', slug: 'alumni-and-staff-profiles', order: 7 },
    { name: 'Stories from Campus', slug: 'stories-from-campus', order: 8 },
  ]

  for (const category of categories) {
    await prisma.blogCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
    console.log(`✓ Created/Updated category: ${category.name}`)
  }

  console.log('✅ Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

