import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content')

export interface MarkdownContent<T> {
  metadata: T
  content: string
  htmlContent: string
}

export async function parseMarkdownFile<T>(
  filePath: string
): Promise<MarkdownContent<T>> {
  const fullPath = path.join(contentDirectory, filePath)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(content)

  return {
    metadata: data as T,
    content,
    htmlContent: processedContent.toString()
  }
}

export function getAllMarkdownFiles(
  directory: string,
  lang: string = 'fr'
): string[] {
  const dirPath = path.join(contentDirectory, directory, lang)

  if (!fs.existsSync(dirPath)) {
    return []
  }

  return fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(directory, lang, file))
}

export function getMarkdownFilesRecursively(
  baseDir: string,
  lang: string
): string[] {
  const dirPath = path.join(contentDirectory, baseDir, lang)

  if (!fs.existsSync(dirPath)) {
    return []
  }

  const files: string[] = []
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)
    if (entry.isDirectory()) {
      files.push(...getMarkdownFilesRecursively(path.join(baseDir, lang, entry.name), lang))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(path.join(baseDir, lang, entry.name))
    }
  }

  return files
}
