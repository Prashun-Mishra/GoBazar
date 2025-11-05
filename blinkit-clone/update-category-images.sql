-- Update category images with Grofers/Blinkit CDN links
-- Run this SQL script in your PostgreSQL database
-- This script tries multiple column names to ensure compatibility

BEGIN;

-- Try different possible column and table structures
DO $$
DECLARE
    rec RECORD;
    update_count INTEGER := 0;
BEGIN
    -- Array of image updates (order, image_url)
    FOR rec IN 
        SELECT * FROM (VALUES
            (1, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-3_9.png'),
            (2, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-2_10.png'),
            (3, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-5_4.png'),
            (4, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-4_9.png'),
            (5, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-9_3.png'),
            (6, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-8_4.png'),
            (7, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-7_3.png'),
            (8, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-12/paan-corner_web.png'),
            (9, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-6_5.png'),
            (10, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-10.png'),
            (11, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-11.png'),
            (12, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-12.png'),
            (13, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-13.png'),
            (14, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-14.png'),
            (15, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-15.png'),
            (16, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-16.png'),
            (17, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-17.png'),
            (18, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-18.png'),
            (19, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-19.png'),
            (20, 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-20.png')
        ) AS t(order_num, image_url)
    LOOP
        -- Try different update strategies
        BEGIN
            -- Strategy 1: Update by order column
            UPDATE categories SET image = rec.image_url WHERE "order" = rec.order_num;
            GET DIAGNOSTICS update_count = ROW_COUNT;
            
            IF update_count = 0 THEN
                -- Strategy 2: Update by order_index column
                UPDATE categories SET image = rec.image_url WHERE order_index = rec.order_num;
                GET DIAGNOSTICS update_count = ROW_COUNT;
            END IF;
            
            IF update_count = 0 THEN
                -- Strategy 3: Update by id (assuming id matches order)
                UPDATE categories SET image = rec.image_url WHERE id = rec.order_num;
                GET DIAGNOSTICS update_count = ROW_COUNT;
            END IF;
            
            IF update_count > 0 THEN
                RAISE NOTICE 'Updated category % with new image', rec.order_num;
            ELSE
                RAISE NOTICE 'Could not find category with order %', rec.order_num;
            END IF;
            
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Error updating category %: %', rec.order_num, SQLERRM;
        END;
    END LOOP;
    
    RAISE NOTICE 'Category image update completed!';
END $$;

-- Verify the updates - try different column names
DO $$
BEGIN
    -- Try to show results with different possible column structures
    BEGIN
        RAISE NOTICE 'Updated categories:';
        FOR rec IN 
            SELECT id, name, image, "order" FROM categories ORDER BY "order" LIMIT 5
        LOOP
            RAISE NOTICE 'ID: %, Name: %, Image: %', rec.id, rec.name, LEFT(rec.image, 50) || '...';
        END LOOP;
    EXCEPTION WHEN OTHERS THEN
        BEGIN
            FOR rec IN 
                SELECT id, name, image, order_index FROM categories ORDER BY order_index LIMIT 5
            LOOP
                RAISE NOTICE 'ID: %, Name: %, Image: %', rec.id, rec.name, LEFT(rec.image, 50) || '...';
            END LOOP;
        EXCEPTION WHEN OTHERS THEN
            FOR rec IN 
                SELECT id, name, image FROM categories ORDER BY id LIMIT 5
            LOOP
                RAISE NOTICE 'ID: %, Name: %, Image: %', rec.id, rec.name, LEFT(rec.image, 50) || '...';
            END LOOP;
        END;
    END;
END $$;

COMMIT;

-- Final verification query (will work regardless of column names)
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'categories' AND column_name = 'order') 
        THEN 'Using order column'
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'categories' AND column_name = 'order_index') 
        THEN 'Using order_index column'
        ELSE 'Using id column'
    END AS update_strategy,
    COUNT(*) as total_categories,
    COUNT(CASE WHEN image LIKE '%grofers.com%' THEN 1 END) as updated_with_grofers_images
FROM categories;
