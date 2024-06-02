import { apiRoot } from '../apiRoot';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  ClientResponse,
  Product,
  ProductProjection,
  ProductProjectionPagedSearchResponse
} from '@commercetools/platform-sdk';
import { getPlanetCatalogId, getSubcategoryId } from '../../helpers/idsMapper';
import type { getProductsRequestProps } from '../../components/Main/Main.interfaces';

export const getProducts = createAsyncThunk<ProductProjection[], getProductsRequestProps>(
  'products/get',
  async ({ planet, subcategory, filter, sortValue, searchQuery }: getProductsRequestProps) => {
    if (searchQuery) {
      const response = await getSearchProducts([], '', searchQuery);
      return response.body.results;
    }

    const getSearchedValue = () => {
      const categoryCondition =
        subcategory && planet
          ? `categories.id:subtree("${getSubcategoryId(planet, subcategory)}")`
          : planet
            ? `categories.id:"${getPlanetCatalogId(planet)}"`
            : '';

      const filterCondition = filter ? `variants.attributes.${filter.type}:"${filter.value}"` : '';

      return categoryCondition && filterCondition
        ? [categoryCondition, filterCondition]
        : categoryCondition
          ? [categoryCondition]
          : [];
    };

    const queryArguments = sortValue
      ? { filter: getSearchedValue(), sort: sortValue }
      : { filter: getSearchedValue() };

    const response = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: queryArguments
      })
      .execute();

    return response.body.results;
  }
);

export const getSearchProducts = (
  filter: string[] = [],
  sortBy: string,
  search = ''
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter,
        sort: sortBy ? sortBy : 'price asc',
        'text.ru': search.toLowerCase(),
        fuzzy: true
      }
    })
    .execute();
};

export const getProduct = async (productKey: string): Promise<Product | undefined> => {
  try {
    const response = await apiRoot.products().withKey({ key: productKey }).get().execute();
    return response.body;
  } catch (error) {
    console.log(error);
  }
};
