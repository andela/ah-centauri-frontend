import React from 'react';
import {Accordion, Grid, Icon, Label,} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class HighlightsList extends React.Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Accordion styled>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name="dropdown" />
                My Highlights
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Grid.Column>
                  The Latest Pro-bending Tournaments
            <Label circular size="large" as={Link}>
                    1
            </Label>

          </Grid.Column>
        </Accordion.Content>
        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
          <Icon name="dropdown" />
                Highlights On My Stories
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <Grid.Column>
                  The Best Story
            <Label circular size="large" as={Link}>
                    15
            </Label>
          </Grid.Column>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default HighlightsList;
