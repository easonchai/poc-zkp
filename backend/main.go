package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"net"
	"net/http"
)

const keyServerAddr = "serverAddr"

func getRoot(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Get body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Printf("could not read body: %s\n", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Parse JSON
	var data map[string]interface{}
	err = json.Unmarshal([]byte(body), &data)
	if err != nil {
		fmt.Printf("could not unmarshal json: %s\n", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	rawAge, ok := data["age"]
	if !ok {
		fmt.Printf("Age does not exist\n")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	age := int64(rawAge.(float64))
	claim := signClaim(age)

	fmt.Printf("%s: Got / request\n", ctx.Value(keyServerAddr))

	io.WriteString(w, claim)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", getRoot)

	ctx := context.Background()
	server := &http.Server{
		Addr:    ":3001",
		Handler: mux,
		BaseContext: func(l net.Listener) context.Context {
			ctx = context.WithValue(ctx, keyServerAddr, l.Addr().String())
			return ctx
		},
	}

	err := server.ListenAndServe()
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("🛑 Server has been terminated\n")
	} else if err != nil {
		fmt.Printf("⚠️ Error starting server: %s\n", err)
	}
}