SELECT * 
FROM `fao-maps.fao_amis.vw_amis_data` 
WHERE database_code = @database and cast(product_code as string) = @product