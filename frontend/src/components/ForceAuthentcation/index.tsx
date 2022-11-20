import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Puff } from 'react-loader-spinner'
import useAuth from '../../hooks/useAuth'
import { Container, ContentLoading } from './styles'

export function ForceAuthentication(props: any) {
  const { loading, user } = useAuth()
  const navigate = useNavigate()
  const [renderContent, setRenderContent] = useState<boolean>(false)

  useEffect(() => {
    if (!loading && user?.username) setRenderContent(true)
    else if (loading) setRenderContent(false)
    else navigate('/authentication')
  }, [loading, user, navigate])

  return (
    <Container>
      {renderContent ? (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if(!document.cookie?.includes("challenge-ng-cod3r-auth")){
                  window.location.href = "/authentication"
                }
              `,
            }}
          />
          {props.children}
        </>
      ) : (
        <ContentLoading>
          <Puff height="150" width="150" color="#f9fafc" />
        </ContentLoading>
      )}
    </Container>
  )
}
