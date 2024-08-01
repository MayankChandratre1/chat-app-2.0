echo "DATABASE_URL=${DATABASE_URL}" > /usr/app/packages/db/.env
npm run db:migrate
npm run db:generate
npm run build
npm run start