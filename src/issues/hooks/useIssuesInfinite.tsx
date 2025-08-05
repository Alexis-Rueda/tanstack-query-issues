import { useInfiniteQuery } from '@tanstack/react-query';
import { getIssues } from '../actions';
import { State } from '../interfaces';

interface Props {
  state: State;
  selectedLabels: string[];
}

export const useIssuesInfinite = ({ state, selectedLabels }: Props) => {


  const issuesQuery = useInfiniteQuery({
    queryKey: ['issues', 'infinite', { state, selectedLabels }],
    queryFn: ({ pageParam, queryKey}) => {
      const  [ , , args] = queryKey;
      const { state, selectedLabels } = args as Props;

      return getIssues(state, selectedLabels, pageParam);
    },
    staleTime: 1000 * 60,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => 
      lastPage.length ? allPages.length : undefined,

    // [ [issue1, issue2], [issue3, issue4] ]
  });


  return {
    issuesQuery,

  };
};