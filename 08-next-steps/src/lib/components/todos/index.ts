export { default } from './Todos.svelte';

export type Todo = {
	id: number;
	name: string;
	completed: boolean;
};

export type Filter = 'all' | 'active' | 'completed';
