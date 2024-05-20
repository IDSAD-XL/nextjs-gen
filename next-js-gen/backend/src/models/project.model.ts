import mongoose, { Schema, Document } from 'mongoose';


export interface IProject extends Document {
  name: string;
  owner: mongoose.Types.ObjectId;
  components: Record<string, any>;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  components: { type: Array, default: [], required: true },
});

// Модель проекта
const Project = mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
