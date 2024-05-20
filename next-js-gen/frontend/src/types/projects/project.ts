import { Editor } from '@/types/editor';

export interface Project {
  _id: string;
  name: string;
  components: Editor['components'];
}
