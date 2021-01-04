import React from 'react';
import RepositoryListHeader from './RepositoryListHeader';
import { FlatList, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <RepositoryListHeader
        handleFilter={props.handleFilter}
        keyword={props.keyword}
        handleKeyword={props.handleKeyword}
      />
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.repositoryNodes}
        style={{ paddingHorizontal: 20, flexGrow: 1, flexShrink: 1 }}
        ListHeaderComponent={this.renderHeader}
        renderItem={(item) => (
          <TouchableOpacity
            onPress={() => this.props.handleRedirect(item.item.id)}
          >
            <RepositoryItem item={item.item} />
          </TouchableOpacity>
        )}
      />
    );
  }
}
