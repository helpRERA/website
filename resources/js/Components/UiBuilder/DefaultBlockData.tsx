import {
  BlockImage,
  LinkData,
  RequiredTextData,
  TextData,
} from '../../DataStructures/ui_builder_interfaces'
import { PageTitleData } from './Blocks/PageTitle'

export interface BlockConfiguration {
  paddingTop?: string
  paddingBottom?: string
  marginTop?: string
  marginBottom?: string
}

export const loremIpsum = 'lorem ipsum'
export const placeholderParagraph =
  'Veritatis omnis at minima. Voluptas sunt eos aperiam non minus. Voluptatem voluptas quam amet. ' +
  'Qui enim sit et cumque doloribus facilis neque.Dolores in molestias cum excepturi reiciendis.'

export const placeholderTitle = 'In dicta dolore numquam qui dolor'

export const placeholderImage = {
  url: '/placeholder.avif',
  caption: 'placeholder image',
}

export interface TextList {
  id: number
  item: TextData
}

export interface ListItem<T> {
  id: number
  item: T
}

export interface ItemListField<T> {
  lastUUID: number
  items: ListItem<T>[]
}

export interface HalfImageBlock extends BlockConfiguration {
  title: TextData
  description: ItemListField<TextData>
  image?: BlockImage | null
  link?: LinkData | null
}

export interface LinksBlockData extends BlockConfiguration {
  links: ItemListField<LinkData>
}

export interface LinkActionCard {
  id?: number
  svg: TextData
  title: TextData
  description: TextData
  link: LinkData
}

export interface LinkActionData extends BlockConfiguration {
  actions: ItemListField<LinkActionCard>
}
export const pageTitleData: PageTitleData = {
  title: {
    english: loremIpsum,
    malayalam: '',
  },
  links: {
    lastUUID: 0,
    items: [],
  },
}

const svg = `
 <svg height="36" width="36" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 viewBox="0 0 512 512" xml:space="preserve">
<polygon style="fill:#F8F8F9;" points="178.886,386.779 125.22,333.112 17.89,494.112 "/>
<polygon style="fill:#EDEDED;" points="152.053,359.946 17.89,494.112 178.886,386.779 "/>
<polygon style="fill:#80CB93;" points="438.275,198.947 313.053,73.725 116.277,252.614 259.387,395.723 "/>
<polygon style="fill:#6DC180;" points="438.275,198.947 375.664,136.337 187.833,324.169 259.387,395.723 "/>
<g>
	<path style="fill:#95D5A7;" d="M0,225.78c29.64-29.638,77.692-29.638,107.331,0L286.22,404.668
		c29.64,29.638,29.64,77.694,0,107.333L0,225.78z"/>
	<path style="fill:#95D5A7;" d="M500.884,225.781c14.821-14.82,14.821-38.848,0-53.667L339.886,11.115
		c-14.819-14.821-38.847-14.82-53.666,0l0,0c-14.819,14.819-14.819,38.847,0,53.666L447.219,225.78
		C462.037,240.601,486.066,240.601,500.884,225.781L500.884,225.781z"/>
</g>
<g>
	<path style="fill:#80CB93;" d="M500.884,172.115l-80.499-80.5l-53.666,53.666l80.499,80.5c14.819,14.82,38.847,14.82,53.666,0.001
		C515.705,210.961,515.705,186.934,500.884,172.115z"/>
	<path style="fill:#80CB93;" d="M286.22,404.668l-89.444-89.444l-53.666,53.666l143.11,143.11
		C315.859,482.362,315.859,434.306,286.22,404.668z"/>
</g>
</svg>`

export const linkActionBlock: LinkActionCard = {
  svg: { english: svg, malayalam: '' },
  title: { english: placeholderTitle, malayalam: placeholderTitle },
  description: { english: placeholderTitle, malayalam: placeholderTitle },
  link: {
    name: { english: 'Link', malayalam: '' },
    link: '/',
    external: false,
  },
}

export const imageBlock = {
  title: {
    english: placeholderTitle,
    malayalam: placeholderTitle,
  },
  description: {
    lastUUID: 1,
    items: [
      {
        id: 1,
        item: {
          english: placeholderParagraph,
          malayalam: placeholderParagraph,
        },
      },
    ],
  },

  image: placeholderImage,
}

export const linkListBlock = {
  links: {
    lastUUID: 0,
    items: [],
  },
}

export interface RichTextBlockData extends BlockConfiguration {
  text: TextData
}

export const richTextData = {
  text: {
    english: '',
    malayalam: '',
  },
}
