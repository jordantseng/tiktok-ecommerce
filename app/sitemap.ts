import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

import { getBaseURL } from '@/lib/utils'
import { getPages } from '@/services/page'
import { getProducts } from '@/services/product';
import { getCategories, getSubCategories, subCategory } from '@/services/category';
import { PAGE_SIZE } from '@/constant';

const escapeXml = (unsafe: string) => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c
    }
  });
};

const generateUrls = (host: string, key: string, value: {
  id: number;
  kindhead_id: number;
  title: string;
  sortnum: number;
  created_at: string;
  updated_at: string;
  kindhead_title: string;
}, currentPage: number, lastPage: number) => {
  const urls = [];
  for (let page = currentPage; page <= lastPage; page += 1) {
    urls.push({ url: escapeXml(`https:${host}/products?page=${page}&type=${key}&subType=${value.id}`) });
  }
  return urls;
};

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headerList = headers()
  const host = headerList.get('host')!
  const baseURL = getBaseURL(host)

  const [{ data: pages }, { data: categories }] = await Promise.all([getPages(baseURL), getCategories(baseURL)])

  const infoEntries = pages.map((page) => ({
    url: `${escapeXml(`https:${host}/info?type=${page.title}&typeId=${page.id}`)}`
  }))

  const categoryIds = categories.data.map((category) => category.id)
  const subCategoryPromises = categoryIds.map((id) => getSubCategories(baseURL, id))
  const subCategoryRes = await Promise.all(subCategoryPromises)

  const categoryMap = categoryIds.reduce<Record<string, subCategory[]>>((acc, val, index) => {
    acc[val] = subCategoryRes[index].data
    return acc
  }, {})

  const productsPromises = Object.entries(categoryMap).map(([key, values]) => values.map((value) => getProducts({
    baseURL,
    page: 1,
    pageSize: PAGE_SIZE,
    kindheadId: key,
    kindmainId: String(value.id),
  }))).flat()
  const productsResponses = await Promise.all(productsPromises)
  const productsEntries = Object.entries(categoryMap).flatMap(([key, values], index) => {
    const { current_page: currentPage, last_page: lastPage } = productsResponses[index].data;
    return values.flatMap(value => generateUrls(host, key, value, currentPage, lastPage));
  });

  const productDetailEntries = productsResponses.map(({ data: products }) => products.data.map(({ id }) => ({
    url: `https:${host}/product-detail?id=${id}`,
  }))).flat()

  return [
    { url: `https:${host}/announcement` },
    { url: `https:${host}/forget-password` },
    { url: `https:${host}/info` },
    ...infoEntries,
    { url: `https:${host}/login` },
    { url: `https:${host}/privacy` },
    ...productsEntries,
    ...productDetailEntries,
    { url: `https:${host}/register` },
    { url: `https:${host}/search` },
    { url: `https:${host}/tos` }
  ]
}

export default sitemap
