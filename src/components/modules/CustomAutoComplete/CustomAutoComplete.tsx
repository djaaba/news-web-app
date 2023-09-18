import { AutoComplete } from 'antd';

import { CustomAutoCompleteProps } from './CustomAutoComplete.props';
import styles from './CustomAutoComplete.module.css';

import { useSearch } from './hooks/useSearch';

export const CustomAutoComplete = ({ className }: CustomAutoCompleteProps): JSX.Element => {
  const { preparedData, search, handleChange } = useSearch();

  return (
    <>
      <AutoComplete
        className={styles.container}
        value={search}
        onSearch={handleChange}
        placeholder="I'm searching..."
        allowClear
      >
        {preparedData}
      </AutoComplete>
    </>
  );
};
