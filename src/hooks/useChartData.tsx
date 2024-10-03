import { useState, useEffect } from 'react';
import { getProducts } from '../services/ProductServices';
import { getCategories } from '../services/CategoryServices'; 
import { ApexOptions } from 'apexcharts';

const useChartData = () => {
  const [data, setData] = useState<{
    series: { name: string; data: number[] }[];
    options: ApexOptions;
  }>({
    series: [],
    options: {
      xaxis: {
        categories: [],
      },
      title: {
        text: 'Productos por Categoría',
        align: 'center', 
        style: {
          fontSize: '16px',
          color: '#000', 
        },
      },
      colors: [] 
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await getCategories();
        const productsResponse = await getProducts();
        const products = productsResponse.data;

        const categoryNames = categoriesResponse.map(category => category.name);
        const productCountByCategory = categoriesResponse.map(category => {
          return products.filter(product => product.category_id === category.id).length;
        });
        const colors = ["#AEC6CF"];

        setData({
          series: [
            {
              name: 'Productos por Categoría',
              data: productCountByCategory,
            },
          ],
          options: {
            xaxis: {
              categories: categoryNames,
            },
            title: {
              text: 'Productos por Categoría',
              align: 'center', 
              style: {
                fontSize: '16px',
                color: '#000', 
              },
            },
            colors: colors,
          },
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching data', error.message);
        } else {
          console.error('Unknown error:', error);
        }
      }
    };

    fetchData();
  }, []);

  return data;
};

export default useChartData;
