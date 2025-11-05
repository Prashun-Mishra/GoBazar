# Docker Commands to Update Category Images

## Quick Update (One Command)

```bash
# Find your PostgreSQL container
docker ps

# Copy and execute SQL script (replace 'container_name' with your actual container name)
docker cp update-category-images.sql container_name:/tmp/update.sql && docker exec container_name psql -U postgres -d gobazar -f /tmp/update.sql
```

## Step by Step Commands

### 1. Find PostgreSQL Container
```bash
docker ps --filter "ancestor=postgres"
# OR
docker ps | grep postgres
```

### 2. Copy SQL File to Container
```bash
docker cp update-category-images.sql YOUR_CONTAINER_NAME:/tmp/update-category-images.sql
```

### 3. Execute SQL Script
```bash
# Try these database/user combinations:
docker exec YOUR_CONTAINER_NAME psql -U postgres -d gobazar -f /tmp/update-category-images.sql
# OR
docker exec YOUR_CONTAINER_NAME psql -U postgres -d postgres -f /tmp/update-category-images.sql
# OR
docker exec YOUR_CONTAINER_NAME psql -U gobazar -d gobazar -f /tmp/update-category-images.sql
```

### 4. Verify Updates
```bash
docker exec YOUR_CONTAINER_NAME psql -U postgres -d gobazar -c "SELECT COUNT(*) as updated_images FROM categories WHERE image LIKE '%grofers.com%';"
```

## Alternative: Interactive Method

### 1. Enter Container
```bash
docker exec -it YOUR_CONTAINER_NAME bash
```

### 2. Connect to Database
```bash
psql -U postgres -d gobazar
```

### 3. Run SQL Script
```sql
\i /tmp/update-category-images.sql
```

### 4. Check Results
```sql
SELECT id, name, LEFT(image, 50) as image_preview FROM categories LIMIT 5;
```

## Common Container Names
- `gobazar-postgres`
- `postgres`
- `gobazar_db_1`
- `blinkit-postgres`
- `ecommerce-db`

## Troubleshooting

### If you get "database does not exist":
```bash
# List all databases
docker exec YOUR_CONTAINER_NAME psql -U postgres -l

# Create database if needed
docker exec YOUR_CONTAINER_NAME psql -U postgres -c "CREATE DATABASE gobazar;"
```

### If you get "role does not exist":
```bash
# List all users
docker exec YOUR_CONTAINER_NAME psql -U postgres -c "\du"

# Create user if needed
docker exec YOUR_CONTAINER_NAME psql -U postgres -c "CREATE USER gobazar WITH PASSWORD 'password';"
```

### Check Docker Compose Services
```bash
# If using docker-compose
docker-compose ps
docker-compose exec db psql -U postgres -d gobazar -f /tmp/update-category-images.sql
```
