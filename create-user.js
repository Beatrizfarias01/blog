const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10)

  const user = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@teste.com',
      password: hashedPassword,
    },
  })

  console.log('Usuário criado:', user)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())