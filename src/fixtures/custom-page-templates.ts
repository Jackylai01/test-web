import { CustomPageTemplate } from '@models/entities/custom-page-template';

const testText =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam magni, aliquid veritatis at unde dolorem quod dolor, sapiente, non architecto nam maiores ullam repellat earum praesentium ut. Amet, repudiandae provident.';
const testTitle = '標題文字';

export const customPageTemplates: CustomPageTemplate[] = [
  {
    _id: 'title_01',
    cover: '/block/title-1.png',
    block: {
      className: 'title',
      elements: [{ tagName: 'h2', context: testTitle }],
    },
  },
  {
    _id: 'title_02',
    cover: '/block/title-2.png',
    block: {
      className: 'title center',
      elements: [{ tagName: 'h2', context: testTitle }],
    },
  },
  {
    _id: 'title_03',
    cover: '/block/title-3.png',
    block: {
      className: 'title right',
      elements: [{ tagName: 'h2', context: testTitle }],
    },
  },
  {
    _id: 'paragraph_01',
    cover: '/block/paragraph-1.png',
    block: {
      className: 'paragraph',
      elements: [{ tagName: 'span', context: testText }],
    },
  },
  {
    _id: 'paragraph_02',
    cover: '/block/paragraph-2.png',
    block: {
      className: 'paragraph row',
      elements: [
        { tagName: 'span', className: 'row__col', context: testText },
        { tagName: 'span', className: 'row__col', context: testText },
      ],
    },
  },
  {
    _id: 'paragraph_03',
    cover: '/block/paragraph-3.png',
    block: {
      className: 'paragraph row',
      elements: [
        { tagName: 'span', className: 'row__col', context: testText },
        { tagName: 'span', className: 'row__col', context: testText },
        { tagName: 'span', className: 'row__col', context: testText },
      ],
    },
  },
  {
    _id: 'table_01',
    cover: '/block/table-1.png',
    block: {
      className: '',
      elements: [
        {
          tagName: 'table',
          className: 'table-container__table table-container__table--info',
          hasSearchBar: false,
          data: [
            ['標題名稱', '標題名稱', '標題名稱'],
            ['標題內容', '標題內容', '標題內容'],
            ['標題內容', '標題內容', '標題內容'],
          ],
        },
      ],
    },
  },
  {
    _id: 'table_02',
    cover: '/block/table-2.png',
    block: {
      className: '',
      elements: [
        {
          tagName: 'table',
          className:
            'table-container__table table-container__table--info small',
          hasSearchBar: false,
          data: [
            ['標題名稱', '標題名稱', '標題名稱'],
            ['標題內容', '標題內容', '標題內容'],
            ['標題內容', '標題內容', '標題內容'],
          ],
        },
      ],
    },
  },
  {
    _id: 'post_01',
    cover: '/block/post-1.png',
    block: {
      className: 'post',
      elements: [
        {
          tagName: 'aside',
          className: 'post__aside',
          elements: [
            {
              tagName: 'h2',
              className: 'post__title',
              context: '標題文字',
            },
            { tagName: 'span', context: testText },
          ],
        },
        { tagName: 'img', src: '/images/demo-img.png' },
      ],
    },
  },
  {
    _id: 'post_02',
    cover: '/block/post-2.png',
    block: {
      className: 'post',
      elements: [
        { tagName: 'img', src: '/images/demo-img.png' },
        {
          tagName: 'aside',
          className: 'post__aside',
          elements: [
            {
              tagName: 'h2',
              className: 'post__title',
              context: '標題文字',
            },
            { tagName: 'span', context: testText },
          ],
        },
      ],
    },
  },
  {
    _id: 'post_03',
    cover: '/block/post-3.png',
    block: {
      className: 'post',
      elements: [
        {
          tagName: 'header',
          className: '',
          elements: [
            {
              tagName: 'h2',
              context: '標題文字',
            },
          ],
        },
        {
          tagName: 'section',
          elements: [
            {
              tagName: 'main',
              className: 'row',
              elements: [
                {
                  tagName: 'article',
                  className: 'row__col',
                  elements: [
                    { tagName: 'img', src: '/images/demo-img.png' },
                    { tagName: 'h3', context: testTitle },
                    { tagName: 'span', context: testText },
                  ],
                },
                {
                  tagName: 'article',
                  className: 'row__col',
                  elements: [
                    { tagName: 'img', src: '/images/demo-img.png' },
                    { tagName: 'h3', context: testTitle },
                    { tagName: 'span', context: testText },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    _id: 'post_04',
    cover: '/block/post-4.png',
    block: {
      className: 'post post--img-full',
      elements: [
        {
          tagName: 'header',
          className: 'post__header',
          elements: [
            {
              tagName: 'h2',
              className: 'post__title',
              context: '標題文字',
            },
          ],
        },
        { tagName: 'article', className: 'margin-bottom', context: testText },
        {
          tagName: 'img',
          src: '/images/demo-img.png',
        },
      ],
    },
  },
  {
    _id: 'post_05',
    cover: '/block/post-5.png',
    block: {
      className: 'post-card',
      elements: [
        { tagName: 'span', className: 'post-card__no', context: '1.' },
        { tagName: 'h2', className: 'post-card__title', context: testTitle },
        { tagName: 'article', className: 'post-card__text', context: testText },
      ],
    },
  },
  {
    _id: 'post_06',
    cover: '/block/post-6.png',
    block: {
      className: 'post-block',
      elements: [{ tagName: 'span', context: testText }],
    },
  },
  {
    _id: 'image_01',
    cover: '/block/image-1.png',
    block: {
      className: 'image',
      elements: [{ tagName: 'img', src: '/images/demo-img.png' }],
    },
  },
  {
    _id: 'image_02',
    cover: '/block/image-2.png',
    block: {
      className: 'image image--small',
      elements: [{ tagName: 'img', src: '/images/demo-img.png' }],
    },
  },
  {
    _id: 'image_03',
    cover: '/block/image-3.png',
    block: {
      className: 'section',
      elements: [
        {
          tagName: 'main',
          className: 'row',
          elements: [
            {
              tagName: 'article',
              className: 'row__col',
              elements: [{ tagName: 'img', src: '/images/demo-img.png' }],
            },
            {
              tagName: 'article',
              className: 'row__col',
              elements: [{ tagName: 'img', src: '/images/demo-img.png' }],
            },
          ],
        },
      ],
    },
  },
  {
    _id: 'item_01',
    cover: '/block/item-1.png',
    block: {
      className: 'demo-items',
      elements: [
        {
          tagName: 'ul',
          className: 'icon-items',
          elements: [
            {
              tagName: 'li',
              elements: [
                {
                  tagName: 'header',
                  className: 'icon-items__header',
                  elements: [
                    {
                      tagName: 'icon',
                      className: 'icomoon-yearly-report',
                    },
                  ],
                },
                {
                  tagName: 'h2',
                  className: 'icon-items__title',
                  context: testTitle,
                },
                {
                  tagName: 'span',
                  className: 'icon-items__info',
                  context: testText,
                },
              ],
            },
            {
              tagName: 'li',
              elements: [
                {
                  tagName: 'header',
                  className: 'icon-items__header',
                  elements: [
                    {
                      tagName: 'icon',
                      className: 'icomoon-yearly-report',
                    },
                  ],
                },
                {
                  tagName: 'h2',
                  className: 'icon-items__title',
                  context: testTitle,
                },
                {
                  tagName: 'span',
                  className: 'icon-items__info',
                  context: testText,
                },
              ],
            },
            {
              tagName: 'li',
              elements: [
                {
                  tagName: 'header',
                  className: 'icon-items__header',
                  elements: [
                    {
                      tagName: 'icon',
                      className: 'icomoon-yearly-report',
                    },
                  ],
                },
                {
                  tagName: 'h2',
                  className: 'icon-items__title',
                  context: testTitle,
                },
                {
                  tagName: 'span',
                  className: 'icon-items__info',
                  context: testText,
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    _id: 'item_02',
    cover: '/block/item-2.png',
    block: {
      className: 'demo-items',
      elements: [
        {
          tagName: 'ul',
          className: 'icon-items icon-items--row',
          elements: [
            {
              tagName: 'li',
              elements: [
                {
                  tagName: 'aside',
                  className: 'icon-items__aside-img',
                  elements: [
                    {
                      tagName: 'img',
                      src: '/images/demo-img.png',
                    },
                  ],
                },
                {
                  tagName: 'article',
                  className: 'icon-items__article',
                  elements: [
                    {
                      tagName: 'h2',
                      className: 'icon-items__title',
                      context: testTitle,
                    },
                    {
                      tagName: 'span',
                      className: 'icon-items__info',
                      context: testText,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    _id: 'item_03',
    cover: '/block/item-3.png',
    block: {
      className: 'demo-items',
      elements: [
        {
          tagName: 'ul',
          className: 'icon-items icon-items--row',
          elements: [
            {
              tagName: 'li',
              elements: [
                {
                  tagName: 'aside',
                  className: 'icon-items__aside-img',
                  elements: [
                    {
                      tagName: 'img',
                      src: '/images/demo-img.png',
                    },
                  ],
                },
                {
                  tagName: 'article',
                  className: 'icon-items__article',
                  elements: [
                    {
                      tagName: 'h2',
                      className: 'icon-items__title',
                      context: testTitle,
                    },
                    {
                      tagName: 'span',
                      className: 'icon-items__info',
                      context: testText,
                    },
                  ],
                },
              ],
            },
            {
              tagName: 'li',
              elements: [
                {
                  tagName: 'aside',
                  className: 'icon-items__aside-img',
                  elements: [
                    {
                      tagName: 'img',
                      src: '/images/demo-img.png',
                    },
                  ],
                },
                {
                  tagName: 'article',
                  className: 'icon-items__article',
                  elements: [
                    {
                      tagName: 'h2',
                      className: 'icon-items__title',
                      context: testTitle,
                    },
                    {
                      tagName: 'span',
                      className: 'icon-items__info',
                      context: testText,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    _id: 'item_04',
    cover: '/block/item-4.png',
    block: {
      className: 'demo-items',
      elements: [
        {
          tagName: 'ul',
          className: 'icon-items icon-items--row',
          elements: [
            {
              tagName: 'li',
              elements: [
                {
                  tagName: 'aside',
                  className: 'icon-items__aside',
                  elements: [
                    {
                      tagName: 'icon',
                      className: 'icomoon-yearly-report',
                    },
                  ],
                },
                {
                  tagName: 'article',
                  className: 'icon-items__article',
                  elements: [
                    {
                      tagName: 'h2',
                      className: 'icon-items__title',
                      context: testTitle,
                    },
                    {
                      tagName: 'span',
                      className: 'icon-items__info',
                      context: testText,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    _id: 'item_05',
    cover: '/block/item-5.png',
    block: {
      className: 'demo-items',
      elements: [
        {
          tagName: 'ul',
          className: 'icon-items icon-items--row icon-items--row-reverse',
          elements: [
            {
              tagName: 'li',
              elements: [
                {
                  tagName: 'aside',
                  className: 'icon-items__aside',
                  elements: [
                    {
                      tagName: 'icon',
                      className: 'icomoon-yearly-report',
                    },
                  ],
                },
                {
                  tagName: 'article',
                  className: 'icon-items__article',
                  elements: [
                    {
                      tagName: 'h2',
                      className: 'icon-items__title',
                      context: testTitle,
                    },
                    {
                      tagName: 'span',
                      className: 'icon-items__info',
                      context: testText,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    _id: 'item_06',
    cover: '/block/item-6.png',
    block: {
      className: 'demo-items',
      elements: [
        {
          tagName: 'ul',
          className: 'icon-items icon-items--row',
          elements: [
            {
              tagName: 'li',
              elements: [
                {
                  tagName: 'aside',
                  className: 'icon-items__aside',
                  elements: [
                    {
                      tagName: 'icon',
                      className: 'icomoon-yearly-report',
                    },
                  ],
                },
                {
                  tagName: 'article',
                  className: 'icon-items__article',
                  elements: [
                    {
                      tagName: 'h2',
                      className: 'icon-items__title',
                      context: testTitle,
                    },
                    {
                      tagName: 'span',
                      className: 'icon-items__info',
                      context: testText,
                    },
                  ],
                },
              ],
            },
            {
              tagName: 'li',
              elements: [
                {
                  tagName: 'aside',
                  className: 'icon-items__aside',
                  elements: [
                    {
                      tagName: 'icon',
                      className: 'icomoon-yearly-report',
                    },
                  ],
                },
                {
                  tagName: 'article',
                  className: 'icon-items__article',
                  elements: [
                    {
                      tagName: 'h2',
                      className: 'icon-items__title',
                      context: testTitle,
                    },
                    {
                      tagName: 'span',
                      className: 'icon-items__info',
                      context: testText,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    _id: 'items_01',
    cover: '/block/custom-items-1.png',
    block: {
      className: 'custom-items',
      elements: [
        {
          tagName: 'items',
          className: 'timeline',
          dataTemplate: [
            {
              tagName: 'strong',
              className: 'timeline__title',
              context: '標題名稱',
            },
            {
              tagName: 'span',
              className: 'timeline__info',
              context: '項目文字內容',
            },
          ],
          data: [
            ['標題名稱', '項目文字內容'],
            ['標題名稱', '項目文字內容'],
          ],
        },
      ],
    },
  },
  {
    _id: 'items_02',
    cover: '/block/custom-items-2.png',
    block: {
      className: '',
      elements: [
        {
          tagName: 'items',
          className: 'dropdown-items',
          dataTemplate: [
            {
              tagName: 'strong',
              className: 'dropdown-items__title',
              context: '標題名稱',
            },
            {
              tagName: 'span',
              className: 'dropdown-items__info',
              context: '項目文字內容',
            },
          ],
          data: [
            ['標題名稱', '項目文字內容'],
            ['標題名稱', '項目文字內容'],
          ],
        },
      ],
    },
  },
  {
    _id: 'items_03',
    cover: '/block/custom-items-3.png',
    block: {
      className: '',
      elements: [
        {
          tagName: 'items',
          className: 'card-items',
          dataTemplate: [
            {
              tagName: 'strong',
              className: 'dropdown-items__container',
              context: '項目文字內容',
            },
          ],
          data: [['項目文字內容']],
        },
      ],
    },
  },
  {
    _id: 'links_01',
    cover: '/block/custom-links-1.png',
    block: {
      className: 'custom-links',
      elements: [
        {
          tagName: 'links',
          className: 'links',
          data: [
            ['超連結文字', 'https://www.google.com.tw/', 'URL'],
            ['超連結文字', 'https://www.google.com.tw/', 'URL'],
          ],
        },
      ],
    },
  },
  {
    _id: 'links_02',
    cover: '/block/custom-links-2.png',
    block: {
      className: 'custom-links',
      elements: [
        {
          tagName: 'links',
          className: 'links links--card',
          data: [
            ['超連結文字', 'https://www.google.com.tw/', 'URL'],
            ['超連結文字', 'https://www.google.com.tw/', 'URL'],
          ],
        },
      ],
    },
  },
  {
    _id: 'loginBlock_01',
    cover: '/block/login-block-1.png',
    block: {
      className: 'login-block',
      elements: [
        {
          tagName: 'loginBlock',
        },
      ],
    },
  },
];
