import { setLoaderMode } from 'shared/components/Loader';
import SearchMembers, { type TSearchMembers } from './SearchMembers';
import { useFormSearchMembers, useSearchMembers } from './SearchMembers.hook';

type SearchMembersEnhancedProps = {
  useSearchMembersFn?: typeof useSearchMembers;
  setLoaderModeFn?: typeof setLoaderMode;
  useFormSearchMembersFn?: typeof useFormSearchMembers;
  SearchMembersCmpt?: typeof SearchMembers;
} & Partial<TSearchMembers>;

const SearchMembersEnhanced = ({
  useSearchMembersFn = useSearchMembers,
  setLoaderModeFn = setLoaderMode,
  useFormSearchMembersFn = useFormSearchMembers,
  SearchMembersCmpt = SearchMembers,
  ...rest
}: SearchMembersEnhancedProps) => {
  const { submitFormSearchMembers, stateFormSearchMembers } = useFormSearchMembersFn({});
  const { anomaly, isLoading, searchMembers } = useSearchMembersFn({ stateFormSearchMembers });

  return (
    <SearchMembersCmpt
      {...rest}
      searchMembers={searchMembers}
      loaderMode={setLoaderModeFn({ isLoading })}
      anomaly={anomaly}
      submitFormSearchMembers={submitFormSearchMembers}
    />
  );
};

export default SearchMembersEnhanced;
