import { FooterDataInterface } from '../Components/AdminPages/FooterEditor/FooterEditor'
import { BlockConfiguration } from './../Components/UiBuilder/DefaultBlockData'
import { Model } from './data_interfaces'
export interface RequiredTextData {
  english: string
  malayalam: string | null
}

export interface NavSection {
  id: number
  section: RequiredTextData
  lastUUID: number
  links: BlockLink[]
}

export interface NavMenuRecords extends Model {
  section: string
  items: NavMenuItem
}

export interface FooterData extends Model {
  items: FooterDataInterface
}

export interface NavMenuItem {
  lastUUID: number
  items: NavSection[]
}

export interface LinkData {
  link: string | null
  name: TextData
  external: boolean
}

export interface BlockLink extends LinkData {
  id: number
}

export interface TextData {
  english: string | null
  malayalam: string | null
}

export interface PageBlock {
  lastUUID: number
  blocks: Block[]
}

export interface Block extends BlockConfiguration {
  id: number
  position: number
  blockName: string
}

export interface Page extends Model {
  title: string
  url: string
  published: boolean
  description: string
  blocks: PageBlock
}

export interface BlockImage {
  url?: string
  caption?: string
}
