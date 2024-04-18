import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "./App";

const PAGE_NUMBER_TEST_ID = "page-number";

describe("Pagination", () => {
  test("Pagination 컴포넌트 렌더링", () => {
    render(
      <Pagination
        totalItems={6}
        itemsPerPage={3}
        pageNumberTestId={PAGE_NUMBER_TEST_ID}
      />
    );

    // assert
    const prevButton = screen.getByText(/previous/i);
    const nextButton = screen.getByText(/next/i);

    const pageNumbers = screen.getAllByTestId(PAGE_NUMBER_TEST_ID);

    pageNumbers.forEach((pageNumber, i) => {
      expect(pageNumber).toHaveTextContent(`${i + 1}`);
    });

    expect(prevButton).toHaveClass("disabled");
    expect(nextButton).not.toHaveClass("disabled");
  });

  test("첫번째 페이지에서는 이전 페이지로 돌아갈 수 없음", () => {
    render(
      <Pagination
        totalItems={6}
        itemsPerPage={3}
        pageNumberTestId={PAGE_NUMBER_TEST_ID}
      />
    );

    // assert
    const prevButton = screen.getByText(/previous/i);
    fireEvent.click(prevButton);

    expect(prevButton).toHaveClass("disabled");
  });

  test("중간 페이지에서는 이전, 다음 페이지로 이동할 수 있음", () => {
    render(
      <Pagination
        totalItems={6}
        itemsPerPage={2}
        pageNumberTestId={PAGE_NUMBER_TEST_ID}
      />
    );

    // assert
    const prevButton = screen.getByText(/previous/i);
    const nextButton = screen.getByText(/next/i);

    fireEvent.click(nextButton); // NOTE nextButton을 클릭해보는 이벤트를 발생시킴.

    expect(prevButton).not.toHaveClass("disabled");
    expect(nextButton).not.toHaveClass("disabled");
  });

  test("마지막 페이지에서는 다음 버튼을 클릭했을 때 다음 페이지로 이동할 수 없음", () => {
    render(
      <Pagination
        totalItems={6}
        itemsPerPage={3}
        pageNumberTestId={PAGE_NUMBER_TEST_ID}
      />
    );

    // assert
    const nextButton = screen.getByText(/next/i);
    fireEvent.click(nextButton);

    expect(nextButton).toHaveClass("disabled");
  });
});
