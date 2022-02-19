import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FileUploadComponent } from './file-upload.component';

export default {
  title: 'FileUploadComponent',
  component: FileUploadComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<FileUploadComponent>;

const Template: Story<FileUploadComponent> = (args: FileUploadComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  fileType: 'csv',
  hasErrorOnType: false,
};
