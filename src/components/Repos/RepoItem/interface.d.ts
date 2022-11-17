export interface RepoItemProps {
	userName: string;
}

export interface SearchParams {
	userName?: string | undefined;
	page?: number | undefined;
	per_page?: number | undefined;
}

export interface PaginationType {
	current: number;
	pageSize: number;
	total: number;
}
