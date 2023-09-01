import FormSearch from '@components/Form/FormSearch';
import LoadingLayout from '@components/Layout/LoadingLayout';
import Pagination from '@components/Pagination';
import { TableDataConfig } from '@fixtures/crud-configs';
import { tableLayoutFormat } from '@helpers/table-layout-format';
import { ApiPaginationResult } from '@services/shared/api';

type Props = {
  title: string;
  isLoading: boolean;
  listData: ApiPaginationResult<unknown> | null;
  tableConfigs?: TableDataConfig[];
  actions: React.ReactNode;
  tableActions?: (item: { _id: string }) => React.ReactNode;
};

const TableLayoutUI = ({
  title,
  isLoading,
  listData,
  tableConfigs,
  actions,
  tableActions,
}: Props) => {
  return (
    <LoadingLayout isLoading={isLoading}>
      <article className='container container--full'>
        <header className='container__header'>
          <h2 className='container__title'>{title}</h2>
          <section className='container__actions'>{actions}</section>
        </header>
        <main className='container__context'>
          <FormSearch />
          {listData?.data && (
            <article className='table-container'>
              <table className='table-container__table'>
                <thead>
                  <tr>
                    {tableConfigs?.map(({ title }) => (
                      <th key={title} scope='col'>
                        {title}
                      </th>
                    ))}
                    <th scope='col'></th>
                  </tr>
                </thead>
                <tbody>
                  {listData.data.map((item: any) => (
                    <tr key={item._id}>
                      {tableConfigs?.map((config, index) =>
                        index === 0 ? (
                          <th key={config.key} scope='row'>
                            {tableLayoutFormat(item, config)}
                          </th>
                        ) : (
                          <td key={config.key}>
                            {tableLayoutFormat(item, config)}
                          </td>
                        ),
                      )}
                      <td className='right'>
                        {tableActions && tableActions(item)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          )}
          {listData?.metadata && <Pagination metadata={listData.metadata} />}
        </main>
      </article>
    </LoadingLayout>
  );
};

export default TableLayoutUI;
