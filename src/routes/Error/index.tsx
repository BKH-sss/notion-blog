import styled from "@emotion/styled"
import React from "react"
import { useRouter } from "next/router"
import { Emoji } from "src/components/Emoji"

type Props = {}

const CustomError: React.FC<Props> = () => {
  const router = useRouter()

  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="top">
          <div>4</div>
          <Emoji>🤔</Emoji>
          <div>4</div>
        </div>
        <div className="text">페이지를 찾을 수 없습니다</div>
        <p className="subtext">
          요청하신 글이 비공개 상태이거나 존재하지 않습니다.
        </p>
        <button className="home-btn" onClick={() => router.push("/")}>
          🏠 홈으로 돌아가기
        </button>
      </div>
    </StyledWrapper>
  )
}

export default CustomError

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-radius: 1.5rem;
  max-width: 56rem;
  .wrapper {
    display: flex;
    padding-top: 4rem;
    padding-bottom: 4rem;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    text-align: center;
    > .top {
      display: flex;
      align-items: center;
      font-size: 4rem;
      line-height: 1;
      font-weight: 700;
    }
    > .text {
      font-size: 1.75rem;
      line-height: 2.25rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.gray12};
    }
    > .subtext {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.gray10};
      margin: 0;
    }
    > .home-btn {
      margin-top: 1rem;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      font-weight: 500;
      border-radius: 0.75rem;
      border: none;
      background-color: ${({ theme }) => theme.colors.gray4};
      color: ${({ theme }) => theme.colors.gray12};
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover {
        background-color: ${({ theme }) => theme.colors.gray6};
        transform: translateY(-2px);
      }
    }
  }
`
