import fs from 'fs'
import axios from 'axios'
import crypto from 'crypto'
import { fileTypeFromBuffer } from 'file-type'

const githubToken = '' 
const owner = 'El-brayan502' 
const branch = 'main'

let repos = ['dat1', 'dat2', 'dat3', 'dat4']

async function ensureRepoExists(repo) {
  try {
    await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Authorization: `Bearer ${githubToken}` }
    })
  } catch (e) {
    if (e.response?.status === 404) {
      await axios.post(`https://api.github.com/user/repos`,
        { name: repo, private: false },
        { headers: { Authorization: `Bearer ${githubToken}` } }
      )
      if (!repos.includes(repo)) repos.push(repo)
    } else throw e
  }
}

function generateRepoName() {
  return `dat-${crypto.randomBytes(3).toString('hex')}`
}

async function uploadFile(buffer) {
  const detected = await fileTypeFromBuffer(buffer)
  const ext = detected?.ext || 'bin'
  const code = crypto.randomBytes(3).toString('hex')
  const fileName = `${code}-${Date.now()}.${ext}`
  const filePathGitHub = `uploads/${fileName}`
  const base64Content = Buffer.from(buffer).toString('base64')

  let targetRepo = repos[Math.floor(Math.random() * repos.length)]
  try {
    await ensureRepoExists(targetRepo)
  } catch {
    targetRepo = generateRepoName()
    await ensureRepoExists(targetRepo)
  }

  await axios.put(
    `https://api.github.com/repos/${owner}/${targetRepo}/contents/${filePathGitHub}`,
    { message: `Upload file ${fileName}`, content: base64Content, branch },
    { headers: { Authorization: `Bearer ${githubToken}` } }
  )

  return `https://raw.githubusercontent.com/${owner}/${targetRepo}/${branch}/${filePathGitHub}`
}

const handler = async (m, { conn }) => {
  try {
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ''
    if (!mime) return m.reply('⚠️ Envía o responde a un archivo para subirlo.')
    m.reply('📤 Subiendo archivo a GitHub, espera un momento...')

    const buffer = await q.download()
    const url = await uploadFile(buffer)

    await m.reply(`✅ Archivo subido con éxito:\n${url}`)
  } catch (e) {
    console.error(e)
    m.reply(`❌ Error: ${e.message}`)
  }
}

handler.help = ['tourl']
handler.tags = ['tools']
handler.command = ['tourl', 'url']

export default handler