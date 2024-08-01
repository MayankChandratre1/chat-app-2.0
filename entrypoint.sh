echo "DATABASE_URL=${DATABASE_URL}" > /usr/app/packages/db/.env
echo "NEXTAUTH_URL=${NEXTAUTH_URL}" > /usr/app/apps/chat-client/.env
echo "NEXTAUTH_SECRET=${NEXTAUTH_SECRET}" > /usr/app/apps/chat-client/.env
echo "WEBSOCKET_URL=${WEBSOCKET_URL}" > /usr/app/apps/chat-client/.env
npm run db:migrate
npm run db:generate
npm run build
npm run start