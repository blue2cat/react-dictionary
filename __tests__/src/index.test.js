import { act, render, waitFor } from "@testing-library/react-native";
import App from "../../src/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoaded } from "expo-font";

beforeEach(async () => {
  await AsyncStorage.clear();
  await AsyncStorage.setItem("@user_preferred_theme", "dark");
  await AsyncStorage.setItem("@user_preferred_font", "Sans Serif");
});

// test if the app renders correctly without crashing
test("renders correctly", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-header");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );
}, 10000);

// FONT TESTS

// test if the fonts load correctly
test("fonts load correctly", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const loaded = isLoaded("Sans Serif");
      expect(loaded).toBe(true);
    },
    { timeout: 6000 }
  );
}, 10000);

// font should be Sans Serif when the app starts
test("font should be Sans Serif when the app starts", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-font-dropdown");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );

  const header = getByTestId("test-header");
  expect(header.props.style[0].fontFamily).toBe("Sans Serif");
}, 10000);

// HEADER TESTS

// test if the app header renders correctly
test("renders header correctly", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-header");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );
}, 10000);

// test if the font switcher button renders correctly
test("renders font dropdown button correctly", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-font-dropdown");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );
}, 10000);

// test if the theme switcher button renders correctly
test("renders theme switcher button correctly", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-theme-switch");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );
}, 10000);

// the switcher button should be true when the theme is dark
test("clicking theme switcher button changes the theme", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-theme-switch");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );

  const switcher = getByTestId("test-theme-switch");
  expect(switcher.props.value).toBe(true);
}, 10000);

// background color should be dark when the theme is dark
test("background color should be dark when the theme is dark", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-header");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );

  const header = getByTestId("test-header");

  expect(header.props.style[0].backgroundColor).toBe("#000000");
}, 10000);

// INPUT AREA TESTS

// test if the input area renders correctly
test("renders input area correctly", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-input-area");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );
}, 10000);

// test if input box renders correctly
test("renders input box correctly", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-input-area-box");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );
}, 10000);

// input string should default to "keyboard"
test('input string should default to "keyboard"', async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-input-area");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );

  const input = getByTestId("test-input-area-box");
  expect(input.props.value).toEqual("keyboard");
}, 10000);

// test entering a word in the input box
test("entering a word in the input box", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-input-area");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );

  const input = getByTestId("test-input-area-box");

  act(() => {
    input.props.onChangeText("hello");
  });
  expect(input.props.value).toEqual("hello");
}, 10000);

// test entering and searching a word
test("entering and searching a word", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-input-area");
      expect(component).not.toBeNull();
    },
    { timeout: 8000 }
  );

  const input = getByTestId("test-input-area-box");

  act(() => {
    input.props.onChangeText("hello");
  });
  expect(input.props.value).toEqual("hello");

  const button = getByTestId("test-search-button");

  button.props.onClick();
  expect(input.props.value).toEqual("hello");
}, 10000);

// test searching for a invalid word
test("searching for a invalid word", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-input-area");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );

  act(() => {
    const input = getByTestId("test-input-area-box");
    input.props.onChangeText("dksafj");
  });

  const button = getByTestId("test-search-button");

  button.props.onClick();

  await waitFor(
    () => {
      const component = getByTestId("test-404-card");
      expect(component).not.toBeNull();
    },
    { timeout: 8000 }
  );
}, 10000);

// test searching with a empty input box
test("searching with a empty input box", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-input-area");
      expect(component).not.toBeNull();
    },
    { timeout: 8000 }
  );

  const input = getByTestId("test-input-area-box");

  act(() => {
    input.props.onChangeText("");
  });

  const button = getByTestId("test-search-button");

  act(() => {
    button.props.onClick();
  });

  await waitFor(
    () => {
      const component = getByTestId("test-error-card");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );
}, 10000);

// WORD CARD TESTS

// test if the word card renders correctly
test("renders word card correctly", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-word-card");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );
}, 10000);

// test the word card contains the word "keyboard"
test('word card contains the word "keyboard"', async () => {
  const { getByText } = render(<App />);

  await waitFor(
    () => {
      const component = getByText("keyboard");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );
}, 10000);

// test searching for another word other than the default word
// results in a different word being displayed
test("searching for another word", async () => {
  const { getByTestId, getByText } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-input-area");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );

  const input = getByTestId("test-input-area-box");

  act(() => {
    input.props.onChangeText("hello");
  });
  expect(input.props.value).toEqual("hello");

  const button = getByTestId("test-search-button");

  act(() => {
    button.props.onClick();
  });

  await waitFor(
    () => {
      const component = getByText("hello");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );
}, 10000);

// test if the audio button renders correctly
test("renders audio button correctly", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-audio-button");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );
}, 10000);

// test that the audio button is not displayed when there is no audio
// we need to search for the word keys and then check if the audio button is displayed
test("audio button is not displayed when there is no audio", async () => {
  const { getByTestId, queryByTestId} = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-input-area");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );

  const input = getByTestId("test-input-area-box");

  act(() => {
    input.props.onChangeText("keys");
  });

  const button = getByTestId("test-search-button");

  act(() => {
    button.props.onClick();
  });

  await waitFor(
    () => {
      const component = queryByTestId("test-audio-button");
      expect(component).toBeNull();
    },
    { timeout: 6000 }
  );
}, 10000);

// test if the phonics section renders correctly
test("renders phonics section correctly", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-phonetic-section");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );
}, 10000);

// test the phonics section does not display when there is no phonics; an example is tas
test("phonics section does not display when there is no phonics", async () => {
  const { getByTestId, queryByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getByTestId("test-input-area");
      expect(component).not.toBeNull();
    },
    { timeout: 6000 }
  );

  const input = getByTestId("test-input-area-box");

  act(() => {
    input.props.onChangeText("tas");
  });

  const button = getByTestId("test-search-button");

  act(() => {
    button.props.onClick();
  });

  await waitFor(
    () => {
      const component = queryByTestId("test-phonetic-section");
      expect(component).toBeNull();
    },
    { timeout: 6000 }
  );
}, 10000);

// test that the section header for each definition renders correctly
test("renders section header for each definition correctly", async () => {
  const { getAllByTestId} = render(<App />);

  await waitFor(
    () => {
      const component = getAllByTestId("test-part-of-speech");
      expect(component).not.toBeNull();
    }
  );

  const component = getAllByTestId("test-part-of-speech");
  expect(component).not.toBeNull();
}, 10000);

// test that the section header for each definition contains the correct part of speech
test("section header for each definition contains the correct part of speech", async () => {
  const { getAllByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getAllByTestId("test-part-of-speech");
      expect(component).not.toBeNull();
    }
  );

  const component = getAllByTestId("test-part-of-speech");
  expect(component[0].props.children).toEqual("noun");
}, 10000);

// test the correct number of definitions are displayed: keyboard
test("correct number of definitions are displayed", async () => {
  const { getAllByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getAllByTestId("test-part-of-speech");
      expect(component).not.toBeNull();
    }
  );

  const component = getAllByTestId("test-part-of-speech");
  expect(component.length).toEqual(2);
}, 10000);

// test the correct number of def by entering a word that has 3 defs: key
test("correct number of definitions are displayed", async () => {
  const { getAllByTestId, getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getAllByTestId("test-part-of-speech");
      expect(component).not.toBeNull();
    }
  );

  const input = getByTestId("test-input-area-box");

  act(() => {
    input.props.onChangeText("key");
  });

  const button = getByTestId("test-search-button");

  act(() => {
    button.props.onClick();
  });

  await waitFor(
    () => {
      const component = getAllByTestId("test-part-of-speech");
      expect(component.length).toEqual(3);
    }
  );

}, 10000);

// test the correct number of definitions are displayed by entering a word that has 5 defs: key
test("correct number of definitions are displayed", async () => {
  const { getAllByTestId, getByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getAllByTestId("test-part-of-speech");
      expect(component).not.toBeNull();
    }
  );

  const input = getByTestId("test-input-area-box");

  act(() => {
    input.props.onChangeText("keys");
  });

  const button = getByTestId("test-search-button");

  act(() => {
    button.props.onClick();
  });

  await waitFor(
    () => {
      const component = getAllByTestId("test-part-of-speech");
      expect(component.length).toEqual(5);
    }
  );

}, 10000);

// ensure definition part of speech is displayed correctly
test("definition part of speech is displayed correctly", async () => {
  const { getAllByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getAllByTestId("test-part-of-speech");
      expect(component).not.toBeNull();
    }
  );

  const component = getAllByTestId("test-part-of-speech");
  expect(component[0].props.children).toEqual("noun");
}, 10000);

// check if the definitions are displayed correctly
test("definitions are displayed correctly", async () => {
  const { getAllByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getAllByTestId("test-definition");
      expect(component).not.toBeNull();
    }
  );

  const component = getAllByTestId("test-definition");
  expect(component[0].props.children).toContain("(etc.) A set of keys used to operate a typewriter, computer etc.");
}, 10000);

// ensure the sources render correctly
test("sources render correctly", async () => {
  const { getByText } = render(<App />);

  await waitFor(
    () => {
      const component = getByText("Source");
      expect(component).not.toBeNull();
    }
  );

}, 10000);

// ensure the synonyms render correctly
test("synonyms render correctly", async () => {
  const { getAllByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getAllByTestId("test-synonyms");
      expect(component).not.toBeNull();
    }
  );

  const component = getAllByTestId("test-synonyms");
  expect(component[0].props.children).toContain("electronic keyboard");
}, 10000);

// ensure the proper number of synonyms are displayed on a search for keyboard
test("proper number of synonyms are displayed", async () => {
  const { getAllByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getAllByTestId("test-synonyms");
      expect(component).not.toBeNull();
    }
  );

  const component = getAllByTestId("test-synonyms");
  expect(component.length).toEqual(1);
}, 10000);

// ensure the proper number of synonyms are displayed on a search for key
test("proper number of synonyms are displayed", async () => {
  const { getAllByTestId, getByTestId, queryAllByTestId } = render(<App />);

  await waitFor(
    () => {
      const component = getAllByTestId("test-synonyms");
      expect(component).not.toBeNull();
    }
  );

  const input = getByTestId("test-input-area-box");

  act(() => {
    input.props.onChangeText("key");
  });

  const button = getByTestId("test-search-button");

  act(() => {
    button.props.onClick();
  });

  await waitFor(
    () => {
      const component = queryAllByTestId("test-synonyms");
      expect(component.length).toEqual(0);
    }
  );
}, 10000);

// ensure the proper number of synonyms are displayed on a search for keys
test("proper number of synonyms are displayed", async () => {
  const { getAllByTestId, queryAllByTestId, getByTestId} = render(<App />);

  await waitFor(
    () => {
      const component = getAllByTestId("test-synonyms");
      expect(component).not.toBeNull();
    }
  );

  const input = getByTestId("test-input-area-box");

  act(() => {
    input.props.onChangeText("keys");
  });

  const button = getByTestId("test-search-button");

  act(() => {
    button.props.onClick();
  });

  await waitFor(
    () => {
      const components = queryAllByTestId("test-synonyms");
      expect(components.length).toEqual(2);
    }
  );
}, 10000);