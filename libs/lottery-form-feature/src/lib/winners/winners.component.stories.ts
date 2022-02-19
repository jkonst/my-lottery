import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { WinnersComponent } from './winners.component';

export default {
  title: 'WinnersComponent',
  component: WinnersComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<WinnersComponent>;

const Template: Story<WinnersComponent> = (args: WinnersComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}