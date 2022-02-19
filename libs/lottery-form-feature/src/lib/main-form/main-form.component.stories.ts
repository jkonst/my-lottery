import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { MainFormComponent } from './main-form.component';

export default {
  title: 'MainFormComponent',
  component: MainFormComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<MainFormComponent>;

const Template: Story<MainFormComponent> = (args: MainFormComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}