export class MenuConfig {
  public defaults: any = {
    header: {
      self: {},
      items: [
        {
          title: 'Pages',
          root: true,
          'icon-': 'flaticon-add',
          toggle: 'click',
          'custom-class': 'kt-menu__item--active',
          alignment: 'left'
          // submenu: []
        },
        {
          title: 'Features',
          root: true,
          'icon-': 'flaticon-line-graph',
          toggle: 'click',
          alignment: 'left'
          // submenu: []
        },
        {
          title: 'Apps',
          root: true,
          'icon-': 'flaticon-paper-plane',
          toggle: 'click',
          alignment: 'left'
          // submenu: []
        }
      ]
    },
    aside: {
      self: {},
      items: [
        {
          title: 'Posts',
          icon: 'fas fa-tasks',
          bullet: 'line',
          page: '/posts'
        },
        {
          title: 'Albums',
          icon: 'fas fa-images',
          bullet: 'line',
          page: '/albums'
        },
        {
          title: 'Users Managment',
          icon: 'fa fa-users',
          bullet: 'line',
          page: '/users'
        }
      ]
    }
  };

  public get configs(): any {
    return this.defaults;
  }
}
